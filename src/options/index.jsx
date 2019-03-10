import * as React from 'react';

import ExtensionController from './controllers/ExtensionController';
import FormController from './controllers/FormController';
import LoggerController from './controllers/LoggerController';

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

const Options = ({className}) => (
  <LoggerController timeout={3000}>
    {({logger, logInfo}) => (
      <FormController onSave={() => logInfo('options saved')}>
        {({isUpdated, getFieldProps, saveFormData, rejectFormData}) => (
          <div className={className}>
            <GlobalStyle />
            <Sections>
              <ExtensionController>
                {({extState}) => (
                  <Notifications values={notifications} state={extState} />
                )}
              </ExtensionController>
              <Section>
                <Checkbox
                  {...getFieldProps('updateNotification')}
                  label="Show update notifications"
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
                <Textarea {...getFieldProps('ignoreList')} />
              </Section>
              <Section
                title="Correct List"
                description='comma-separated list of case-insensitive words to *replace* during conversion, "e.g. Hi Mark!, VHS, ..."'
              >
                <Textarea {...getFieldProps('correctList')} />
              </Section>
            </Sections>
            <Controls>
              <Console logger={logger} />
              <Button
                value="Reject"
                hidden={isUpdated}
                onClick={rejectFormData}
              />
              <PrimaryButton
                value="Save"
                disabled={isUpdated}
                onClick={saveFormData}
              />
            </Controls>
            <Ribbon active={!isUpdated} />
          </div>
        )}
      </FormController>
    )}
  </LoggerController>
);

export default Options;
