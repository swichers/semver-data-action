import { describe, expect, test } from 'vitest';
import { generateSemvers } from './semver';

describe('semver', () => {

  const tests = [
    {
      semver: '1.0.0',
      valid: true,
      expected: {
        semver: '1.0.0',
        major: 1,
        minor: 0,
        patch: 0,
        next: {
          major: '2.0.0',
          minor: '1.1.0',
          patch: '1.0.1'
        }
      }
    },
    {
      semver: '1.1.1',
      valid: true,
      expected: {
        semver: '1.1.1',
        major: 1,
        minor: 1,
        patch: 1,
        next: {
          major: '2.0.0',
          minor: '1.2.0',
          patch: '1.1.2'
        }
      }
    },
    {
      semver: '2.10.0',
      valid: true,
      expected: {
        semver: '2.10.0',
        major: 2,
        minor: 10,
        patch: 0,
        next: {
          major: '3.0.0',
          minor: '2.11.0',
          patch: '2.10.1'
        }
      }
    },
    {
      semver: '1.0.0-beta.1',
      valid: true,
      expected: {
        semver: '1.0.0-beta.1',
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: ['beta', 1],
        next: {
          major: '1.0.0',
          minor: '1.0.0',
          patch: '1.0.0'
        }
      }
    },
    {
      semver: '1.1.1-beta.1',
      valid: true,
      expected: {
        semver: '1.1.1-beta.1',
        major: 1,
        minor: 1,
        patch: 1,
        preRelease: ['beta', 1],
        next: {
          major: '2.0.0',
          minor: '1.2.0',
          patch: '1.1.1'
        }
      }
    },
    {
      semver: 'v1.3.15',
      valid: true,
      expected: {
        semver: '1.3.15',
        major: 1,
        minor: 3,
        patch: 15,
        next: {
          major: '2.0.0',
          minor: '1.4.0',
          patch: '1.3.16'
        }
      }
    }
  ]

  tests.forEach(testData => {
    test(`Using semver '${testData.semver}'`, () => {
      const result = generateSemvers(testData.semver);

      expect(result.valid).toBe(testData.valid);

      if (testData.valid) {
        expect(result.semver).toBe(testData.expected.semver);
        expect(result.major).toBe(testData.expected.major);
        expect(result.minor).toBe(testData.expected.minor);
        expect(result.patch).toBe(testData.expected.patch);

        expect(result.next?.major).toBe(testData.expected.next.major);
        expect(result.next?.minor).toBe(testData.expected.next.minor);
        expect(result.next?.patch).toBe(testData.expected.next.patch);

        if (testData.expected.preRelease) {
          expect(result.preRelease).toEqual(testData.expected.preRelease);
        } else {
          expect(result.preRelease).toBeUndefined();
        }
      }
    });
  });
});
