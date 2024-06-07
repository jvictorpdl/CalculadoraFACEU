import { Container, Label } from "./styles";
import { Select } from "../Select";
import { useState } from "react";

const ItemSelect = ({ options, ...props }) => {
  const [locale, setLocale] = useState(props.locale);

  function updateData(value) {
    props.setData({ ...props.data, [locale]: value });
  }

  return (
    <Container>
      <Label htmlFor="my-select">
        <span className="tooltiptext">
          {props.tooltip}
        </span>
        {props.title}
        {props.sub && <sub>{props.sub}</sub>}
      </Label>
      
      <Select
        id="my-select"
        name="my-select"
        value={props.value ? props.value : props.data[locale]}
        onChange={(evento) => updateData(evento.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default ItemSelect;

























// import { Container } from "./styles";
// import { Select } from "../Select";
// import { useState } from "react";

// const ItemSelect = ({ options, props }) => {
//   const [locale, setLocale] = useState(props.locale);

//   function updateData(value) {
//     props.setData({ ...props.data, ...value });
//   }


//   return (
//     <Container>
//       <label htmlFor="my-select">
//       <span className="tooltiptext">
//           {props.tooltip}
//         </span>
//       </label>

//       <Select id="my-select" name="my-select">
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </Select>
//     </Container>
//   );
// };

// export default ItemSelect;
