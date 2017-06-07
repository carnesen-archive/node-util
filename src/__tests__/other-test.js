const util = require('..')

describe(__filename, function () {
  it('expandHomeDir does the right thing', function () {
    util.expandHomeDir('foo').should.equal('foo')
    util.expandHomeDir('~').should.equal(process.env.HOME)
  })
})
