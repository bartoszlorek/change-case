import { createConfirmation } from 'react-confirm'
import Dialog from './components/Dialog'

const confirm = createConfirmation(Dialog, 0)

export default message => confirm({ message })
