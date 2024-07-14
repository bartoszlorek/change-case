import './global.scss';
import * as React from 'react';
import {accessStorage} from '../helpers';
import {initialStorageValues} from '../storage';
import {useForm} from './useForm';
import {useLog} from './useLog';
import {
  Button,
  Console,
  Controls,
  Ribbon,
  Section,
  Sections,
  Textarea,
} from './components';

const openShortcutsPage = () =>
  chrome.tabs.create({url: 'chrome://extensions/shortcuts'});

export function App() {
  const log = useLog({
    timeout: 3000,
  });

  const {isUpdated, getFieldProps, submitForm, rejectForm} = useForm({
    getInitialState: () => initialStorageValues,
    getStorageState: () => accessStorage(initialStorageValues).getValues(),
    onSubmit: async data => {
      await accessStorage(initialStorageValues).setValues(data);
      log.info('options saved');
    },
    onError: () => {
      log.warn('something went wrong');
    },
  });

  return (
    <div>
      <Ribbon active={!isUpdated} />
      <Sections>
        <Section
          title="Keyboard Shortcuts"
          description="Since 2.3.0 version, this extension supports browser native keyboard shortcuts. Open them and scroll to Change Case card."
        >
          <Button
            type="primary"
            text="Open Chrome Keyboard Shortcuts"
            size="full"
            onClick={openShortcutsPage}
          />
        </Section>
        <Section
          title="Ignore List"
          description='comma-separated list of case-insensitive words to *ignore* during conversion, "e.g. Hello World, New York, John, ..."'
        >
          <Textarea {...getFieldProps('ignoreList')} ariaLabel="Ignore List" />
        </Section>
        <Section
          title="Correct List"
          description='comma-separated list of case-insensitive words to *replace* during conversion, "e.g. Hi Mark!, VHS, ..."'
        >
          <Textarea
            {...getFieldProps('correctList')}
            ariaLabel="Correct List"
          />
        </Section>
      </Sections>

      <Controls>
        <Console log={log} />
        {!isUpdated && <Button text="Reject" onClick={rejectForm} />}
        <Button
          type="primary"
          text="Save"
          disabled={isUpdated}
          onClick={submitForm}
        />
      </Controls>
    </div>
  );
}
