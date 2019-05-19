import * as React from 'react';

import useExtension from './hooks/useExtension';
import useForm from './hooks/useForm';
import useLog from './hooks/useLog';

import GlobalStyle from './components/GlobalStyle';
import Ribbon from './components/Ribbon';
import Console from './components/Console';
import Section from './components/layout/Section';
import Sections from './components/layout/Sections';
import Controls from './components/layout/Controls';
import Button, {PrimaryButton} from './components/forms/Button';
import Textarea from './components/forms/Textarea';
import Checkbox from './components/forms/Checkbox';
import Notifications from './components/notifications/Notifications';

import notifications from './notifications';

const openShortcutsPage = () =>
  chrome.tabs.create({url: 'chrome://extensions/shortcuts'});

const App = ({className}) => {
  const {extState} = useExtension();
  const log = useLog({
    timeout: 3000
  });

  const {isUpdated, getFieldProps, saveForm, rejectForm} = useForm({
    onSave: () => log.info('options saved')
  });

  return (
    <div className={className}>
      <GlobalStyle />
      <Sections>
        <Notifications values={notifications} state={extState} />
        <Section>
          <Checkbox
            {...getFieldProps('updateNotification')}
            label="Show update notifications"
            name="update-notification"
          />
        </Section>
        <Section
          title="Keyboard Shortcuts"
          description="Since 2.3.0 version, this extension supports browser native keyboard shortcuts. Open them and scroll to Change Case card."
        >
          <PrimaryButton
            value="Open Chrome Keyboard Shortcuts"
            onClick={openShortcutsPage}
            wide
          />
        </Section>
        <Section
          title="Ignore List"
          description='comma-separated list of case-insensitive words to *ignore* during conversion, "e.g. Hello World, New York, John, ..."'
        >
          <Textarea {...getFieldProps('ignoreList')} name="ignore-list" />
        </Section>
        <Section
          title="Correct List"
          description='comma-separated list of case-insensitive words to *replace* during conversion, "e.g. Hi Mark!, VHS, ..."'
        >
          <Textarea {...getFieldProps('correctList')} name="correct-list" />
        </Section>
      </Sections>
      <Controls>
        <Console log={log} />
        <Button value="Reject" hidden={isUpdated} onClick={rejectForm} />
        <PrimaryButton value="Save" disabled={isUpdated} onClick={saveForm} />
      </Controls>
      <Ribbon active={!isUpdated} />
    </div>
  );
};

export default App;
