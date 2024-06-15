import * as React from 'react';
import styled from 'styled-components';
import useForm from './useForm';
import {useLog} from './useLog';
import {
  Button,
  PrimaryButton,
  Console,
  Controls,
  GlobalStyle,
  Ribbon,
  Section,
  Sections,
  Textarea,
} from './components';

type FieldType = 'ignoreList' | 'correctList';

const openShortcutsPage = () =>
  chrome.tabs.create({url: 'chrome://extensions/shortcuts'});

type PropsType = Readonly<{
  className?: string;
}>;

function App({className}: PropsType) {
  const log = useLog({
    timeout: 3000,
  });

  const {isUpdated, getFieldProps, saveForm, rejectForm} = useForm({
    onSave: () => log.info('options saved'),
    transform: data =>
      new Map<FieldType, string>([
        ['ignoreList', data.ignoreList || ''],
        ['correctList', data.correctList || ''],
      ]),
  });

  return (
    <div className={className}>
      <GlobalStyle />
      <Sections>
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
        {!isUpdated && <Button value="Reject" onClick={rejectForm} />}
        <PrimaryButton value="Save" disabled={isUpdated} onClick={saveForm} />
      </Controls>
      <Ribbon active={!isUpdated} />
    </div>
  );
}

export default styled(App)`
  background: #f6f7f9;
`;
