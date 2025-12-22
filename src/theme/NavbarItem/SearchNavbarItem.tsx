import React, {useState} from 'react';
import CustomSearch from "@site/src/components/CustomSearch";

export default function SearchNavbarItem() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  return (
    <>
      <button
        onClick={() => setSearchOpen(true)}
        className="navbar__item navbar__link custom-search-button"
      >
        <span className="custom-search-icon">
          <img src="/img/search-icon.svg" alt="" width="20" height="20" />
        </span>
        <span className="custom-search-text">جستجو</span>
      </button>
      <CustomSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
