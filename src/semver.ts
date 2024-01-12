import * as semver from 'semver';

export type SemverData = {
  valid: boolean;
  semver?: string;
  major?: number;
  minor?: number;
  patch?: number;
  preRelease?: string[];
  next?: {
    major: string;
    minor: string;
    patch: string;
  }

}

export function generateSemvers(version: string): SemverData {
  const validatedSemVer = semver.valid(version);

  const result = {
    valid: validatedSemVer !== null
  }

  if (validatedSemVer) {
    result['semver'] = validatedSemVer;
    result['major'] = semver.major(validatedSemVer);
    result['minor'] = semver.minor(validatedSemVer);
    result['patch'] = semver.patch(validatedSemVer);

    result['next'] = getNextValues(validatedSemVer);

    const preRelease = semver.prerelease(validatedSemVer);
    if (preRelease && preRelease.length > 0) {
      result['preRelease'] = preRelease;
    }
  }
  return result;
}

function getNextValues(version: string) {
  const result = {
    major: semver.inc(version, 'major'),
    minor: semver.inc(version, 'minor'),
    patch: semver.inc(version, 'patch')
  }
  return result;
}