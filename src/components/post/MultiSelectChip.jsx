import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
  "Artificial Intelligence",
  "Networking",
  "Software Development",
  "Web Development",
  "Database Management",
  "IT Infrastructure",
  "Mobile App Development",
  "Machine Learning",
  "IT Security",
  "System Administration",
  "Digital Marketing",
  "Internet of Things (IoT)",
  "Blockchain Technology",
  "IT Consulting",
  "Project Management",
  "Virtualization",
  "IT Support Services",
];

function getStyles(tag, selectedTags, theme) {
  return {
    fontWeight:
      selectedTags && selectedTags.indexOf(tag) !== -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({ blogTags, onChange }) {
  const theme = useTheme();
  const [selectedTags, setSelectedTags] = React.useState(blogTags || []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(value);
    onChange(value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 400 }}>
        <InputLabel id="demo-multiple-chip-label">Thẻ</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
              style={getStyles(tag, selectedTags, theme)}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
