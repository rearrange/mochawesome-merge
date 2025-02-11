const { merge } = require('../lib')

describe('merge', () => {
  test('merges configs', async () => {
    const report = await merge({
      files: [
        './tests/mochawesome-report/mochawesome_001.json',
        './tests/mochawesome-report/mochawesome_002.json',
        './tests/mochawesome-report/mochawesome_004.json',
        './tests/mochawesome-report/mochawesome.json',
      ],
    })
    const suites = report.results

    expect(report.stats).toMatchSnapshot()
    expect(suites.length).toBe(4)

    // mochawesome_001.json
    expect(suites[0].tests.length).toBe(1)
    expect(suites[0].passes.length).toBe(0)
    expect(suites[0].failures.length).toBe(1)
    expect(suites[0].skipped.length).toBe(0)
    expect(suites[0].pending.length).toBe(0)

    // mochawesome_002.json
    expect(suites[1].tests.length).toBe(3)
    expect(suites[1].passes.length).toBe(1)
    expect(suites[1].failures.length).toBe(2)
    expect(suites[1].skipped.length).toBe(0)
    expect(suites[1].pending.length).toBe(0)

    // mochawesome_004.json
    expect(suites[2].tests.length).toBe(2)
    expect(suites[2].passes.length).toBe(0)
    expect(suites[2].failures.length).toBe(0)
    expect(suites[2].skipped.length).toBe(1)
    expect(suites[2].pending.length).toBe(1)

    // mochawesome.json
    expect(suites[3].tests.length).toBe(2)
    expect(suites[3].passes.length).toBe(2)
    expect(suites[3].failures.length).toBe(0)
    expect(suites[3].skipped.length).toBe(0)
    expect(suites[3].pending.length).toBe(0)
  })

  test('throws when invalid directory provided', async () => {
    const reportsGlob = './invalid-directory/mochawesome*.json'

    await expect(merge({ files: [reportsGlob] })).rejects.toEqual(
      new Error(`Pattern ${reportsGlob} matched no report files`)
    )
  })

  test('defaults to mochawesome-report directory', async () => {
    const reportsGlob = './mochawesome-report/mochawesome*.json'
    await expect(merge()).rejects.toEqual(
      new Error(`Pattern ${reportsGlob} matched no report files`)
    )
  })
})
