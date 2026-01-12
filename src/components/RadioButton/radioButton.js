import styled from 'styled-components';


const CustomRadioIndicator = styled.div`
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      // ... other default styling
      &::after { // For the inner dot when checked
        content: '';
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background-color: #2BA3AB; // Color of the inner dot
        transform: scale(0); // Initially hidden
        transition: transform 0.2s ease-in-out;
      }
    `;

const HiddenRadioInput = styled.input`
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:checked + ${CustomRadioIndicator} {
        border-color: #2BA3AB; // Change border color when checked
        &::after {
          transform: scale(1); // Show the inner dot when checked
        }
      }
    `;

const RadioWrapper = styled.label`
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative; // For positioning the hidden input
    `;

const Label = styled.span`
    color: #4B5563
    /* Body e paragraph/Body/Body 2 - medium */
    font-family: var(--Font-Family-title, Inter);
    font-size: var(--Font-Size-size-14, 14px);
    font-style: normal;
    font-weight: var(--Font-Weight-weight-medium, 400);
    line-height: var(--Font-Line-height-line-height-20, 20px); /* 142.857% */
    letter-spacing: var(--Font-Letter-spacing-letter-spacing, 0);
    
    margin-left: 4px;
`

export function RadioButton({ value, name, checked, onChange, label }) {
    return (
        <RadioWrapper>
            <HiddenRadioInput
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                onClick={onChange}
            />
            <CustomRadioIndicator />
            <Label>{label}</Label>
        </RadioWrapper>
    );
}