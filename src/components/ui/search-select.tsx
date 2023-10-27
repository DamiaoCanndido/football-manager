import { Select } from 'antd';
import { Dispatch } from 'react';
const { Option } = Select;

interface propTypes {
  setSelect: Dispatch<React.SetStateAction<string>>;
  options: Object[];
}

export function SearchSelect(props: propTypes) {
  return (
    <Select className="w-40" id="type" onChange={props.setSelect} allowClear>
      {props.options.map((e) => {
        return (
          <Option key={Object.entries(e)[0][0]} value={Object.entries(e)[0][0]}>
            {Object.entries(e)[0][1]}
          </Option>
        );
      })}
    </Select>
  );
}
