import { useState, useEffect } from "react";
import Select from "react-select";
import "./Searcher.css";

export function Searcher({ tagsCategory, filterClothes }) {
    const [tags, setTags] = useState(tagsCategory || []);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        setTags(tagsCategory);
    }, [tagsCategory]);

    const handleChange = (selected) => {
        setSelectedTags(selected);
        const selectedTagValues = selected.map((tag) => tag.value);
        filterClothes(selectedTagValues);
    };

    const handleCreate = (inputValue) => {
        const newTag = { value: inputValue.toLowerCase(), label: inputValue };
        setTags((prevTags) => [...prevTags, newTag]);
        setSelectedTags((prevSelected) => [...prevSelected, newTag]);
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 searcher">
            <h2 className="text-lg font-semibold mb-2">DressUp</h2>
            <Select
                options={tags}
                isMulti
                value={selectedTags}
                onChange={handleChange}
                placeholder="Search..."
                onCreateOption={handleCreate}
                className="text-black"
                isClearable
                noOptionsMessage={() => "Type to add a new tag"}
            />
        </div>
    );
}
