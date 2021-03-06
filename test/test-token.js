const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const { expect } = require('chai');

const { BN, expectEvent, expectRevert, send } = require('@openzeppelin/test-helpers');

// Create a contract object from a compilation artifact
const BRWLERC20 = contract.fromArtifact('BRWLERC20UpgradeSafe');

describe('BRWLERC20', function () {
  const [ owner, escrow, user ] = accounts;
  const onetrillion = new BN('10000000000000000');

  beforeEach(async function () {
    this.timeout(5000);
    // Deploy a new BRWLERC20 contract for each test
    this.contract = await BRWLERC20.new({ from: owner });
    await this.contract.initialize(escrow, { from: owner });
  });

  it('initializes', async function () {
    // Test if the supply is as expected
    expect((await this.contract.totalSupply())).to.be.bignumber.equal(onetrillion);
    expect((await this.contract.balanceOf(escrow))).to.be.bignumber.equal(onetrillion);
    expect((await this.contract.symbol())).to.equal('BRWL');
    expect((await this.contract.name())).to.equal('Blockchain Brawlers Token');
    expect((await this.contract.decimals())).to.be.bignumber.equal(new BN(4));

    await expectRevert(
      this.contract.initialize(escrow, { from: escrow }),
      'Contract instance has already been initialized'
    );
  });

  it('transfers', async function () {
    const amount = new BN('100');
    await this.contract.transfer(user, amount, { from: escrow });
    expect((await this.contract.balanceOf(escrow))).to.be.bignumber.equal(onetrillion.sub(amount));
    expect((await this.contract.balanceOf(user))).to.be.bignumber.equal(amount);
    await expectRevert(
      this.contract.transfer(user, onetrillion, { from: escrow }),
      'transfer amount exceeds balance'
    );
  });
  
  it('should not allow transfer() when to is null', async function () {
    const amount = new BN('100');
    await expectRevert(
      this.contract.transfer(null, amount, { from: escrow }),
      'invalid address'
    );
  });

  it('should not allow transfer() when to is 0x0000000000000000000000000000000000000000', async function() {
    const amount = new BN('100');
    await expectRevert(
      this.contract.transfer('0x0000000000000000000000000000000000000000', amount, { from: escrow }),
      'transfer to the zero address'
    );
  })

  it.skip('should not allow transfer() when to is the contract address', async function() {
    const amount = new BN('100');
    await expectRevert(
      this.contract.transfer(this.contract.address, amount, { from: escrow }),
      'transfer to the zero address'
    );
  });

  it('should allow transferFrom(), when properly approved, when unpaused', async function() {
    const amount = new BN('100');
    let receipt = await this.contract.approve(user, amount, { from: escrow });
    expectEvent(receipt, 'Approval', { value: amount });
    await this.contract.transferFrom(escrow, user, amount, { from: user });
    expect((await this.contract.balanceOf(escrow))).to.be.bignumber.equal(onetrillion.sub(amount));
    expect((await this.contract.balanceOf(user))).to.be.bignumber.equal(amount);
  })

  it('should allow approve(), and allowance() when unpaused', async function() {
    const amount = new BN('100');
    let receipt = await this.contract.approve(user, amount, { from: escrow });
    expectEvent(receipt, 'Approval', { value: amount });
    expect(await this.contract.allowance(escrow, user, { from: escrow })).to.be.bignumber.equal(amount);
    await this.contract.approve(user, 0, { from: escrow });
  })

  it('should not allow transferFrom() when to is null', async function() {
    const amount = new BN('100');
    await this.contract.approve(user, amount, { from: escrow });
    await expectRevert(
      this.contract.transferFrom(escrow, null, amount, { from: user }),
      'invalid address'
    );
    await this.contract.approve(user, 0, { from: escrow });
  })

  it('should not allow transferFrom() when to is 0x0000000000000000000000000000000000000000', async function() {
    const amount = new BN('100');
    await this.contract.approve(user, amount, { from: escrow });
    await expectRevert(
      this.contract.transferFrom(escrow, '0x0000000000000000000000000000000000000000', amount, { from: user }),
      'transfer to the zero address'
    );
    await this.contract.approve(user, 0, { from: escrow });
  })

  it.skip('should not allow transferFrom() when to is the contract address', async function() {
    const amount = new BN('100');
    await this.contract.approve(user, amount, { from: escrow });
    await expectRevert(
      this.contract.transferFrom(escrow, this.contract.address, amount, { from: user }),
      'transfer to the zero address'
    );
    await this.contract.approve(user, 0, { from: escrow });
  });

  it('should not be able to send ETH to contract', async function() {
    await send.ether(escrow, user, '1');
    await expectRevert.unspecified(
      send.ether(escrow, this.contract.address, '1')
    );
  });

  it('should not be able to burn more than balance', async function() {
    const amount = new BN('100');
    await expectRevert(
      this.contract.burn(amount, { from: user }),
      'burn amount exceeds balance'
    );
  });

  it('should able to burn token', async function() {
    const amount = new BN('1000000000000000');
    await this.contract.transfer(user, amount, { from: escrow });
    await this.contract.burn(amount, { from: user });
    const totalSupply = await this.contract.totalSupply();
    const userBalance = await this.contract.balanceOf(user);
    expect(totalSupply.toString()).to.equal('9000000000000000');
    expect(userBalance.toString()).to.equal('0');
  });

  it('should test burnFrom', async function() {
    const execeedBurnAmount = new BN('1000000');
    const allowanceAmount = new BN('990000');
    await this.contract.approve(user, allowanceAmount, { from: escrow });
    await expectRevert(
      this.contract.burnFrom(escrow, execeedBurnAmount, { from: user }),
      'burn amount exceeds allowance'
    );

    await this.contract.burnFrom(escrow, allowanceAmount, { from: user });
    const totalSupply = await this.contract.totalSupply();
    const userAllowance = await this.contract.allowance(escrow, user);
    expect(totalSupply.toString()).to.equal('9999999999010000');
    expect(userAllowance.toString()).to.equal('0');
  });
});