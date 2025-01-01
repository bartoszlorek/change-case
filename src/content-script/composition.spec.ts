import {camelCase} from '../methods/v3';
import {composeMethod} from './composition';

describe('composeMethod()', () => {
  const input = `Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, where’s the peck of pickled peppers Peter Piper picked?`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    {
      ignoreList: undefined,
      correctList: undefined,
      output: `peterPiperPickedAPeckOfPickledPeppersAPeckOfPickledPeppersPeterPiperPickedIfPeterPiperPickedAPeckOfPickledPeppersWhereSThePeckOfPickledPeppersPeterPiperPicked`,
    },
    {
      ignoreList: 'peter piper, PICKLED PEPPERS',
      correctList: undefined,
      output: `Peter Piper PickedAPeckOfpickled peppers.APeckOfpickled peppers Peter Piper PickedIfPeter Piper PickedAPeckOfpickled peppers,WhereSThePeckOfpickled peppers Peter Piper Picked`,
    },
    {
      ignoreList: undefined,
      correctList: 'peter piper, PICKLED PEPPERS',
      output: `peter piperPickedAPeckOfPICKLED PEPPERSAPeckOfPICKLED PEPPERSpeter piperPickedIfpeter piperPickedAPeckOfPICKLED PEPPERSWhereSThePeckOfPICKLED PEPPERSpeter piperPicked`,
    },
    {
      ignoreList: 'peter piper',
      correctList: 'PICKLED PEPPERS',
      output: `Peter Piper PickedAPeckOfPICKLED PEPPERSAPeckOfPICKLED PEPPERSPeter Piper PickedIfPeter Piper PickedAPeckOfPICKLED PEPPERSWhereSThePeckOfPICKLED PEPPERSPeter Piper Picked`,
    },
    {
      ignoreList: 'peter piper, PICKLED PEPPERS',
      correctList: 'peter piper, PICKLED PEPPERS',
      output: `peter piperPickedAPeckOfPICKLED PEPPERSAPeckOfPICKLED PEPPERSpeter piperPickedIfpeter piperPickedAPeckOfPICKLED PEPPERSWhereSThePeckOfPICKLED PEPPERSpeter piperPicked`,
    },
  ])(
    'returns output with [$ignoreList] and [$correctList] applied',
    async ({ignoreList, correctList, output}) => {
      (chrome.storage.sync.get as jest.Mock).mockResolvedValueOnce({
        ignoreList,
        correctList,
      });

      const composedMethod = await composeMethod(camelCase());
      expect(composedMethod(input)).toEqual(output);
    }
  );
});
