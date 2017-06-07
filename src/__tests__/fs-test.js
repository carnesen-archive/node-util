const path = require('path')
const util = require('../index')

const tmpDir = path.resolve(__dirname, 'tmp')
const subDir = path.resolve(tmpDir, 'sub')
const tmpFile1 = path.resolve(subDir, 'test1.txt')
const tmpFile2 = path.resolve(subDir, 'test2.txt')
const tmpFile3 = path.resolve(subDir, 'test3.txt')
const contents = 'foo'

describe(__dirname, function () {
  it('exported methods do the right thing', async function () {
    await util.emptyDir(tmpDir)
    await util.readdir(tmpDir).then(fileNames => fileNames.length.should.equal(0))
    await util.ensureDir(subDir)
    await util.stat(subDir).then(stats => stats.isDirectory().should.equal(true))
    await util.readdir(tmpDir).then(fileNames => fileNames.should.deep.equal([path.basename(subDir)]))
    await util.writeFile(tmpFile1, contents)
    await util.copy(tmpFile1, tmpFile2)
    await util.readFile(tmpFile2, {encoding: 'utf8'}).then(ret => ret.should.equal(contents))
    await util.rename(tmpFile2, tmpFile3)
    await util.readFile(tmpFile3, {encoding: 'utf8'}).then(ret => ret.should.equal(contents))
    await util.readdir(subDir).then(fileNames => fileNames.length.should.equal(2))
    await util.remove(tmpDir)
    await util.stat(tmpDir).catch(e => e.code.should.equal('ENOENT'))
    await util.createTmpFile()
    await util.createTmpDir()
  })
})
