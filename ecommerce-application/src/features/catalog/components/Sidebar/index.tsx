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
import Select, { SingleValue } from 'react-select';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sortOptions } from '../../constants/constants';
import styles from './Sidebar.module.scss';
import { CustomCategory, ICurrentFilters } from '../../../../types/types';
import { getStartCategoryID } from '../../constants/utils';

// eslint-disable-next-line max-lines-per-function
export function CatalogSidebar(props: {
  setcurrentFilters: React.Dispatch<
    React.SetStateAction<Partial<ICurrentFilters>>
  >;
  productCategories: CustomCategory[];
  brands: string[];
  categorySlug: string | undefined;
  subCategorySlug: string | undefined;
}): React.ReactElement {
  const {
    productCategories,
    brands,
    setcurrentFilters,
    categorySlug,
    subCategorySlug,
  } = props;
  const [categoryFilterProps, setCategoryFilterProps] = useState('');
  const [trademarkProps, setTrademarkProps] = useState(['']);
  const [originFilterProps, setoriginFilterProps] = useState(['']);
  const [lowerPriceFilterProps, setLowerPriceFilterProps] = useState(0);
  const [higherPriceFilterProps, setHigherPriceFilterProps] = useState(0);
  const [sortProps, setSortProps] = useState('');
  const [searchProps, setSearchProps] = useState('');
  const [currentSearchString, setCurrentSearchString] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(0);
  const [componentKey, setComponentKey] = useState(0);

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

  const handleFiltersClick = (categoryID: string): void => {
    setCategoryFilterProps(`${categoryID}`);
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
  };

  const handleLowerPriceChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const currentPrice = +event.target.value;
    const regex = /[^0-9]/g;

    if (
      !`${currentPrice}`.match(regex) &&
      currentPrice < higherPriceFilterProps
    ) {
      setLowerPriceFilterProps(currentPrice);
    }
  };

  const handleHigherPriceChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const currentPrice = +event.target.value;
    const regex = /[^0-9]/g;

    if (
      !`${currentPrice}`.match(regex) &&
      currentPrice > lowerPriceFilterProps
    ) {
      setHigherPriceFilterProps(currentPrice);
    }
  };

  const handleSortChange = (
    option: SingleValue<{ value: string; label: string }>,
  ): void => {
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

  useEffect(() => {
    setcurrentFilters({
      category: categoryFilterProps,
      trademark: trademarkProps,
      originFilter: originFilterProps,
      lowerPrice: lowerPriceFilterProps,
      higherPrice: higherPriceFilterProps,
      sort: sortProps,
      search: searchProps,
    });
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
    <Link to={`/catalog/${category.slug}`} key={category.id}>
      <SubMenu
        active={
          window.location.pathname === `/catalog/${category.slug}` ||
          window.location.pathname === `/catalog/${category.slug}/`
        }
        key={category.key}
        label={category.name}
        onClick={(): void => handleFiltersClick(category.id)}
      >
        {category.children.map((child) => (
          <Link to={`/catalog/${category.slug}/${child.slug}`} key={child.id}>
            <MenuItem
              active={
                window.location.pathname ===
                  `/catalog/${category.slug}/${child.slug}` ||
                window.location.pathname ===
                  `/catalog/${category.slug}/${child.slug}/`
              }
              key={child.key}
              onClick={(): void => handleFiltersClick(child.id)}
            >
              {child.name.replace('_', ' ')}
            </MenuItem>
          </Link>
        ))}
      </SubMenu>
    </Link>
  ));

  const brandsList = brands.map((brand: string) => (
    <li key={brand}>
      <input
        type="checkbox"
        onChange={(event): void => handleBrandsClick(event, brand)}
      />
      <span className="text">{brand}</span>
    </li>
  ));

  const handleResetFilters = (): undefined => {
    setTrademarkProps(['']);
    setoriginFilterProps(['']);
    setLowerPriceFilterProps(0);
    setHigherPriceFilterProps(0);
    setSortProps('');
    setSearchProps('');
    setCurrentSearchString('');
    setComponentKey(componentKey + 1);
  };

  return (
    <div key={componentKey} style={{ display: 'flex' }}>
      <Sidebar
        collapsed={collapsed}
        collapsedWidth="130px"
        className={styles.sidebar}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            overflow: 'visible',
          },
        }}
      >
        <Menu
          rootStyles={{
            [`.${menuClasses.button}`]: {
              ':hover': {
                backgroundColor: '#fdff8d',
              },
            },
            position: 'sticky',
            top: '1.5rem',
          }}
          menuItemStyles={{
            button: ({ level, active }): CSSObject | undefined => {
              if (level === 0)
                return {
                  backgroundColor: active ? '#64e44c' : undefined,
                };
              if (level === 1)
                return {
                  backgroundColor: active ? '#fdff8d' : undefined,
                };
              return undefined;
            },
          }}
        >
          <button
            type="button"
            className={styles.reset}
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
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
            options={sortOptions}
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
                fontSize: '14px',
                height: '2rem',
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
            }}
          />

          {categories}
          <SubMenu label="Filters" defaultOpen>
            <ul className={styles.list}>
              <li className={styles.price}>
                <strong>Price: </strong>
                <span>from</span>
                <input
                  type="text"
                  placeholder="min"
                  onChange={(event): void => handleLowerPriceChange(event)}
                />
                <span>to</span>
                <input
                  type="text"
                  placeholder="max"
                  onChange={(event): void => handleHigherPriceChange(event)}
                />
              </li>
              <li className={styles.brand}>
                <ul className={styles.brand_list}>
                  <strong>Brands</strong>
                  {brandsList}
                </ul>
              </li>
              <li className={styles.brand}>
                <ul className={styles.brand_list}>
                  <strong>originFilter</strong>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(event): void =>
                        handleOriginChange(event, 'local')
                      }
                    />
                    <span className="text">Local</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(event): void =>
                        handleOriginChange(event, 'foreign')
                      }
                    />
                    <span className="text">Foreign</span>
                  </li>
                </ul>
              </li>
            </ul>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
