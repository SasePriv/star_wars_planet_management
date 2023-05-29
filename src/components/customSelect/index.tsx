import Select, {GroupBase, Props} from "react-select";

export type OptionType = {
  value: string;
  label: string;
};

export default function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>
>(props: Props<OptionType, IsMulti, Group>) {
  return (
    <Select {...props} />
  );
}