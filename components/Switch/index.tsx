import { CheckBoxWrapper, CheckBox, CheckBoxLabel } from './styles';

const Switch = ({ onChange }: { onChange: any }) => {

    function checkBoxHandler() {
        onChange();
    }

    return (
        <CheckBoxWrapper>
            <CheckBox id="checkbox" type="checkbox" onChange={checkBoxHandler} />
            <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
    )
}

export default Switch; 