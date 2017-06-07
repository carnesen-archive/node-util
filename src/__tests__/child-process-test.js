const {exec, execFile} = require('..')

describe(__filename, function () {
  it('exec resolves an object with stdout and stderr on success', async function () {
    const result = await exec(`"${process.execPath}" --version`)
    result.stdout.should.match(new RegExp(process.version))
    result.stderr.should.equal('')
  })

  it('exec rejects an object with stdout and stderr on error', async function () {
    try {
      await exec(`"${process.execPath}" --asdf`)
      throw new Error('should not be thrown')
    } catch (ex) {
      ex.stdout.should.equal('')
      ex.stderr.should.match(/bad option/)
    }
  })

  it('execFile resolves an object with stdout and stderr on success', async function () {
    const result = await execFile(process.execPath, ['--version'])
    result.stdout.should.match(new RegExp(process.version))
    result.stderr.should.equal('')
  })

  it('execFile rejects an object with stdout and stderr on error', async function () {
    try {
      await execFile(process.execPath, ['--asdf'])
      throw new Error('should not be thrown')
    } catch (ex) {
      ex.stdout.should.equal('')
      ex.stderr.should.match(/bad option/)
    }
  })

  it('execFile throws TypeError', async function () {
    try {
      await execFile(function () {})
      throw new Error('should not be thrown')
    } catch (ex) {
      ex.should.be.an.instanceOf(TypeError)
    }
  })
})
