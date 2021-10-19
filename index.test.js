
import * as core from '@actions/core'
const index = require('./index');
const nock = require('nock');
const { expect, jest } = require('@jest/globals');
jest.setTimeout(30000);

describe('check function', () => {
    beforeAll(() => {
        // Mock getInput

        jest.spyOn(core, 'getInput').mockImplementation((name) => {
            var inputs = {
                "token": "fake_token",
                "status_url": "https://fake_url.com/",
                "timeout": 3,
                "error_count": 1,
                "timeout_duration": 10
            }
            return inputs[name]
        })

        jest.spyOn(core, 'setOutput').mockImplementation((param) => {
            return param
        })

        jest.spyOn(core, 'setFailed').mockImplementation((param) => {
            return param
        })
        // Mock error/warning/info/debug
        jest.spyOn(core, 'error').mockImplementation(jest.fn())
        jest.spyOn(core, 'warning').mockImplementation(jest.fn())
        jest.spyOn(core, 'info').mockImplementation(jest.fn())
        jest.spyOn(core, 'debug').mockImplementation(jest.fn())
    })

    test('should error out if the api fails too many times', async () => {

        const scope = nock('https://fake_url.com/')
            .get('/')
            .reply(500, {
                "status": "error",
                "message": "fake_error"
            })

        await index.check();
        expect(core.setFailed).toHaveBeenCalledTimes(1)
        expect(core.setFailed).toHaveBeenCalledWith("Request failed with status code 500")
        scope.done()
    })

    test('should complete correctly if the api returns success', async () => {
        const scope = nock('https://fake_url.com')
            .get('/')
            .reply(200, {
                "status": "succeed"
            })
        await index.check()
        expect(core.setOutput).toHaveBeenCalledWith('status', 'succeed')
        scope.done()
    });

    it('should eventually time out', async () => {
        const scope = nock('https://fake_url.com')
            .persist()
            .get('/')
            .reply(200, {
                "status": "deploying"
            })
        await index.check()
        expect(core.setFailed).toHaveBeenCalledWith("Timeout reached, aborting!")
        scope.done()
    });
});