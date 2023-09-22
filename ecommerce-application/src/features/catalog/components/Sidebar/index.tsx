import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  CSSObject,
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  menuClasses,
  sidebarClasses,
} from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { CustomCategory, ICurrentFilters } from '../../../../types/types';
import { sortOptions } from '../../constants/constants';
import { getStartCategoryID } from '../../utils/utils';
import BrandsList from '../BrandsList';
import styles from './Sidebar.module.scss';
import { themeContext } from '../../../../context/themeContext';

// eslint-disable-next-line max-lines-per-function
export function CatalogSidebar(props: {
  setcurrentFilters: React.Dispatch<
    React.SetStateAction<Partial<ICurrentFilters>>
  >;
  productCategories: CustomCategory[];
  brands: string[];
  categorySlug: string | undefined;
  subCategorySlug: string | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactElement {
  const {
    productCategories,
    brands,
    setcurrentFilters,
    categorySlug,
    subCategorySlug,
    setCurrentPage,
  } = props;
  const navigate = useNavigate();
  const [categoryFilterProps, setCategoryFilterProps] = useState('');
  const [trademarkProps, setTrademarkProps] = useState(['']);
  const [originFilterProps, setoriginFilterProps] = useState(['']);
  const [lowerPriceFilterProps, setLowerPriceFilterProps] = useState('');
  const [higherPriceFilterProps, setHigherPriceFilterProps] = useState('');
  const [sortProps, setSortProps] = useState('price asc');
  const [searchProps, setSearchProps] = useState('');
  const [currentSearchString, setCurrentSearchString] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(0);
  const [componentKey, setComponentKey] = useState(0);

  const currentTheme = useContext(themeContext);

  const handleNavigate = (path: string): void => {
    navigate(path);
  };

  useEffect(() => {
    setCategoryFilterProps(
      getStartCategoryID(productCategories, categorySlug, subCategorySlug),
    );
  }, [productCategories, categorySlug, subCategorySlug]);

  useEffect(() => {
    if (window.innerWidth < 678) {
      setWidth(window.innerWidth);
    }
  }, []);

  const handleFiltersClick = (
    categoryID: string,
    redirectPath: string,
  ): void => {
    setCurrentPage(1);
    setCategoryFilterProps(`${categoryID}`);
    handleNavigate(redirectPath);
  };

  const handleBrandsClick = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ): void => {
    if (event.target.checked) {
      setTrademarkProps([...trademarkProps, value]);
    } else {
      setTrademarkProps(trademarkProps.filter((filter) => filter !== value));
    }
    setCurrentPage(1);
  };

  const handleOriginChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ): void => {
    if (event.target.checked) {
      setoriginFilterProps([...originFilterProps, value]);
    } else {
      setoriginFilterProps(
        originFilterProps.filter((filter) => filter !== value),
      );
    }
    setCurrentPage(1);
  };

  const handleLowerPriceChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const currentPrice = event.target.value;
    const regex = /[^0-9.,]/g;
    const currentPriceAsNumber = currentPrice.replace(',', '.');

    if (
      (!`${currentPrice}`.match(regex) && +currentPriceAsNumber) ||
      currentPriceAsNumber === '' ||
      currentPriceAsNumber === '0'
    ) {
      setLowerPriceFilterProps(currentPriceAsNumber.toString());
    }
    setCurrentPage(1);
  };

  const handleHigherPriceChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const currentPrice = event.target.value;
    const regex = /[^0-9.,]/g;
    const currentPriceAsNumber = currentPrice.replace(',', '.');

    if (
      (!`${currentPrice}`.match(regex) && +currentPriceAsNumber) ||
      currentPriceAsNumber === '' ||
      currentPriceAsNumber === '0'
    ) {
      setHigherPriceFilterProps(currentPriceAsNumber.toString());
    }
    setCurrentPage(1);
  };

  const handleSortChange = (
    option: SingleValue<{ value: string; label: string }>,
  ): void => {
    setCurrentPage(1);
    setSortProps(option ? option.value : '');
  };

  const handleSearchInput = (searchValue: string): void => {
    setCurrentSearchString(searchValue);
  };

  const handleSearchClick = (): void => {
    setSearchProps(currentSearchString);
  };

  const getWindowSize = (): void => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', getWindowSize);
    if (width && width < 678) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
    return () => {
      window.removeEventListener('resize', getWindowSize);
    };
  }, [width]);

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      setcurrentFilters({
        category: categoryFilterProps,
        trademark: trademarkProps,
        originFilter: originFilterProps,
        lowerPrice: lowerPriceFilterProps,
        higherPrice: higherPriceFilterProps,
        sort: sortProps,
        search: searchProps,
      });
    } else didMount.current = true;
  }, [
    setcurrentFilters,
    categoryFilterProps,
    trademarkProps,
    originFilterProps,
    lowerPriceFilterProps,
    higherPriceFilterProps,
    sortProps,
    searchProps,
  ]);

  const categories = productCategories.map((category) => (
    <SubMenu
      className={styles.category}
      active={
        window.location.pathname === `/catalog/${category.slug}` ||
        window.location.pathname === `/catalog/${category.slug}/`
      }
      key={category.key}
      label={category.name}
      onClick={(): void =>
        handleFiltersClick(category.id, `/catalog/${category.slug}`)
      }
    >
      {category.children.map((child) => (
        <MenuItem
          className={styles.subcategory}
          active={
            window.location.pathname ===
              `/catalog/${category.slug}/${child.slug}` ||
            window.location.pathname ===
              `/catalog/${category.slug}/${child.slug}/`
          }
          key={child.key}
          onClick={(): void =>
            handleFiltersClick(
              child.id,
              `/catalog/${category.slug}/${child.slug}`,
            )
          }
        >
          {child.name.replace('_', ' ')}
        </MenuItem>
      ))}
    </SubMenu>
  ));

  const handleResetFilters = (): void => {
    setTrademarkProps(['']);
    setoriginFilterProps(['']);
    setLowerPriceFilterProps('');
    setHigherPriceFilterProps('');
    setSortProps('');
    setSearchProps('');
    setCurrentSearchString('');
    setComponentKey(componentKey + 1);
    setCurrentPage(1);
  };

  return (
    <div key={componentKey} className={styles.container}>
      <Sidebar
        collapsed={collapsed}
        width="100px"
        style={{ width: '100%' }}
        collapsedWidth="130px"
        className={styles.sidebar}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            overflow: 'visible',
            backgroundColor: 'black',
          },
        }}
      >
        <Menu
          className={styles.menu}
          rootStyles={{
            [`.${menuClasses.button}`]: {
              ':hover': {
                backgroundColor:
                  currentTheme.theme === 'light' ? '#fdff8d' : '#fd7107',
              },
            },
            position: 'sticky',
            top: '1.5rem',
          }}
          menuItemStyles={{
            button: ({ level, active }): CSSObject | undefined => {
              if (level === 0)
                return currentTheme.theme === 'light'
                  ? {
                      color: '#000',
                      backgroundColor: active ? '#64e44c' : '#fff',
                    }
                  : {
                      color: '#fff',
                      backgroundColor: active ? '#64e44c' : '#000',
                    };
              if (level === 1)
                return currentTheme.theme === 'light'
                  ? {
                      color: '#000',
                      backgroundColor: active ? '#fdff8d' : '#fff',
                    }
                  : {
                      color: '#fff',
                      backgroundColor: active ? '#fd7107' : '#000',
                    };
              return undefined;
            },
          }}
        >
          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              placeholder="search..."
              onChange={(e): void =>
                handleSearchInput(e.target.value.toLowerCase())
              }
            />
            <FiSearch
              className={styles.search_icon}
              onClick={(): void => handleSearchClick()}
            />
          </div>
          <Select
            inputId="hello"
            options={sortOptions}
            defaultValue={sortOptions.find(({ value }) => value === sortProps)}
            isClearable
            placeholder="sort..."
            className={styles.sort}
            onChange={handleSortChange}
            styles={{
              control: (base, state) => ({
                ...base,
                boxShadow: 'none',
                borderColor: state.isFocused ? '#ededed' : '#ededed',
                '&:hover': {
                  borderColor: state.isFocused ? '#ededed' : '#ededed',
                },
                border: '1px solid #ededed',
                fontSize: '0.9em',
                height: '2em',
                margin: '5px',
                padding: '0',
              }),
              option: (base, state) => ({
                ...base,
                borderColor: '#ededed',
                color: '#000',
                backgroundColor: state.isSelected ? '#fff' : '#fff',
                '&:hover': {
                  borderColor: state.isFocused ? '#ededed' : '#ededed',
                  color: '#000',
                  backgroundColor: '#fdff8d',
                },
              }),
              singleValue: (base) => ({
                ...base,
                color: currentTheme.theme === 'light' ? '#000' : '#fff',
              }),
            }}
          />

          {categories}
          <SubMenu label="Filters" defaultOpen>
            <ul className={styles.list}>
              <li className={styles.price}>
                <strong className={styles.price_name}>Price: </strong>
                <div className={styles.price_item}>
                  <span>from</span>
                  <input
                    type="text"
                    placeholder="min"
                    onChange={(event): void => handleLowerPriceChange(event)}
                  />
                </div>
                <div className={styles.price_item}>
                  <span>to</span>
                  <input
                    type="text"
                    placeholder="max"
                    onChange={(event): void => handleHigherPriceChange(event)}
                  />
                </div>
              </li>
              <li>
                <BrandsList
                  brands={brands}
                  handleBrandsClick={handleBrandsClick}
                />
              </li>
              <li className={styles.brand}>
                <ul className={styles.origin_list}>
                  <strong className={styles.origin_header}>Origin</strong>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(event): void =>
                        handleOriginChange(event, 'local')
                      }
                    />
                    <span className={styles.origin_label}>Local</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(event): void =>
                        handleOriginChange(event, 'foreign')
                      }
                    />
                    <span className={styles.origin_label}>Foreign</span>
                  </li>
                </ul>
              </li>
              <button
                type="button"
                className={styles.reset}
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </ul>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
