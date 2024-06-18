import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import api from "../../config/axios";

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

export default function MultipleSelectChip({ value, onChange }) {
  const theme = useTheme();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []); // Gọi API khi component mount

  const fetchTags = async () => {
    try {
      const response = await api.get("/tag"); // Gọi API để lấy danh sách tag
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value: selectedTags },
    } = event;
    onChange(selectedTags); // Truyền giá trị đã chọn ra ngoài
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 400 }}>
        <InputLabel id="demo-multiple-chip-label">Thẻ</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
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
              key={tag._id}
              value={tag.tag_name} // Sử dụng tag_name thay vì _id
              style={getStyles(tag.tag_name, value, theme)}
            >
              {tag.tag_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function getStyles(tag, selectedTags, theme) {
  return {
    fontWeight:
      selectedTags && selectedTags.indexOf(tag) !== -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}