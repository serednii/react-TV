import React from 'react';
import styles from './titleCards.module.scss';
// import AppContext from '../../context';

function TitleCards({
    onChangeSearchInput, 
    searchValue, 
    setSearchValue,
}) {
  console.log('render TitleCards')

    // const { onChangeSearchInput, searchValue, setSearchValue } = React.useContext(AppContext);

    return (
        <div className={styles.titleCards}>
            <h1 className={styles.title}>{searchValue ? `Search by request: ${searchValue}` : 'All TVs'}</h1>
            <div className={styles.searchBlock}>
                <img className={styles.imgSearch} src='images/search.svg' alt='search' />
                <input onChange={onChangeSearchInput} placeholder='Search ...' value={searchValue} />
                {searchValue && <img onClick={() => setSearchValue("")} className={styles.imgClear} src='images/btn-remove.svg' alt='clear' />}
            </div>
        </div>
    );
}

export default TitleCards;