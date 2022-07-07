import { CheckBoxWrapper, CheckBox, CheckBoxLabel } from './styles';

const Switch = () => {
    return (
        <CheckBoxWrapper>
            <CheckBox id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
    )
}

export default Switch; 