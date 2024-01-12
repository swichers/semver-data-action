import * as core from '@actions/core';
import { generateSemvers } from './semver';

async function run() {
  try {
    const inputs = {
      version: getRequiredInput('version'),
    }

    const data = generateSemvers(inputs.version);
    if (!data.valid) {
      core.setFailed(`Provided version was not a valid semver, '${inputs.version}'`);
    } else {
      core.startGroup('Semver data');
      setOutput('semver', data.semver);
      setOutput('major', data.major);
      setOutput('minor', data.minor);
      setOutput('patch', data.patch);

      setOutput('nextMajor', data?.next?.major);
      setOutput('nextMinor', data?.next?.minor);
      setOutput('nextPatch', data?.next?.patch);

      setOutput('isPreRelease', data.preRelease === undefined ? 'false' : 'true');

      if (data.preRelease !== undefined) {
        setOutput('preRelease', JSON.stringify(data.preRelease));
        setOutput('preReleaseString', data.preRelease.join('.'));
      }

      setOutput('semverData', JSON.stringify(data));
      core.endGroup();
    }
  } catch (err: any) {
    core.setFailed(err);
  }
}

run();

function getRequiredInput(name) {
  return core.getInput(name, { required: true });
}

function setOutput(name: string, value?: string | number) {
  if (value !== undefined) {
    core.info(`  output '${name}' = '${value}'`);
    core.setOutput(name, value);
  }
}