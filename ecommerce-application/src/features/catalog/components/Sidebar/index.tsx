import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { getCategories } from '../../../../api/requests';
import { CustomCategory, ICurrentFilters } from '../../../../types/types';
import styles from './Sidebar.module.scss';

// eslint-disable-next-line max-lines-per-function
export function CatalogSidebar(props: {
  categoryFilter: (...args: ICurrentFilters[]) => Promise<void>;
  brands: string[];
}): React.ReactElement {
  const { categoryFilter, brands } = props;
  const [productCategories, setProductCategories] = useState<CustomCategory[]>(
    [],
  );
  const [categoriesList, setCategoriesList] = useState<JSX.Element[]>([]);
  const [currentFilters, setcurrentFilters] = useState<ICurrentFilters>({
    category: '',
    trademark: [],
    originFilter: [],
    lowerPrice: 0,
    higherPrice: 0,
    sort: '',
  });
  const [brandsList, setBrandsList] = useState<JSX.Element[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState<number>();

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

  const options = [
    { value: 'price asc', label: 'price' },
    { value: 'name.en asc', label: 'name' },
    { value: 'variants.attributes.trademark desc', label: 'trademark' },
    { value: 'variants.attributes.origin.key asc', label: 'origin' },
  ];

  useEffect(() => {
    getCategories().then(
      (result) => {
        const categories: CustomCategory[] = result.body.results.map(
          (category) => {
            const newCategory: CustomCategory = {
              id: category.id,
              parentID: category.parent?.id,
              key: category.key,
              slug: category.slug.en,
              name: category.name.en,
              children: [],
            };
            return newCategory;
          },
        );
        const categoriesTree = categories.filter(
          (category) => !category.parentID,
        );
        categories
          .filter((category) => category.parentID)
          .forEach((subcategory) => {
            const parentIdx = categoriesTree.findIndex(
              (item) => item.id === subcategory.parentID,
            );
            if (parentIdx !== -1) {
              categoriesTree[parentIdx].children.push(subcategory);
            }
          });
        console.log('Should return categories tree!', categoriesTree);
        setProductCategories(categoriesTree);
      },
      (error) => {
        console.log(error);
      },
    );
    if (window.innerWidth < 678) setCollapsed(true);
  }, []);

  // eslint-disable-next-line max-lines-per-function
  useEffect(() => {
    const handleFiltersClick = (filter: string, value: string): void => {
      setcurrentFilters({
        ...currentFilters,
        [filter]: value,
      });
      const filters = {
        ...currentFilters,
        [filter]: value,
      };
      categoryFilter({ ...filters });
    };
    if (productCategories) {
      setCategoriesList(
        // eslint-disable-next-line max-lines-per-function
        productCategories.map((category) => (
          <SubMenu
            key={category.key}
            label={category.name}
            onClick={(): void => handleFiltersClick('category', category.id)}
          >
            {category.children.map((child) => (
              <MenuItem
                key={child.key}
                onClick={(): void => handleFiltersClick('category', child.id)}
              >
                {child.name.replace('_', ' ')}
              </MenuItem>
            ))}
          </SubMenu>
        )),
      );
    }
    const handleBrandsClick = (
      event: ChangeEvent<HTMLInputElement>,
      value: string,
    ): void => {
      if (event.target.checked) {
        setcurrentFilters({
          ...currentFilters,
          trademark: [...currentFilters.trademark, value],
        });
        const filters = {
          ...currentFilters,
          trademark: [...currentFilters.trademark, value],
        };
        categoryFilter({ ...filters });
      } else {
        const filters = {
          ...currentFilters,
          trademark: [
            ...currentFilters.trademark.filter((filter) => filter !== value),
          ],
        };

        categoryFilter({ ...filters });

        setcurrentFilters({
          ...currentFilters,
          trademark: [
            ...currentFilters.trademark.filter((filter) => filter !== value),
          ],
        });
      }
    };
    setBrandsList(
      brands.map((brand: string) => (
        <li key={brand}>
          <input
            type="checkbox"
            onChange={(event): void => handleBrandsClick(event, brand)}
          />
          <span className="text">{brand}</span>
        </li>
      )),
    );
  }, [productCategories, categoryFilter, currentFilters, brands]);

  const handleOriginChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ): void => {
    if (event.target.checked) {
      const filters = {
        ...currentFilters,
        originFilter: [...currentFilters.originFilter, value],
      };
      categoryFilter({ ...filters });

      setcurrentFilters({
        ...currentFilters,
        originFilter: [...currentFilters.originFilter, value],
      });
    } else {
      const filters = {
        ...currentFilters,
        originFilter: [
          ...currentFilters.originFilter.filter((filter) => filter !== value),
        ],
      };

      categoryFilter({ ...filters });

      setcurrentFilters({
        ...currentFilters,
        originFilter: [
          ...currentFilters.originFilter.filter((filter) => filter !== value),
        ],
      });
    }
  };

  const handlePriceChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
  ): void => {
    const regex = /[^0-9]/g;
    if (!event.target.value.match(regex)) {
      const filters = {
        ...currentFilters,
        [name]: +event.target.value,
      };

      categoryFilter({ ...filters });

      setcurrentFilters({
        ...currentFilters,
        [name]: +event.target.value,
      });
    }
  };

  const handleSortChange = (
    option: SingleValue<{ value: string; label: string }>,
  ): void => {
    const filters = {
      ...currentFilters,
      sort: option ? option.value : '',
    };
    categoryFilter({ ...filters });
    setcurrentFilters({
      ...currentFilters,
      sort: option ? option.value : '',
    });
  };
  return (
    <div style={{ display: 'flex' }}>
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
          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              placeholder="search..."
            />
            <FiSearch className={styles.search_icon} />
          </div>
          <Select
            options={options}
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

          {categoriesList}
          <SubMenu label="Filters" defaultOpen>
            <ul className={styles.list}>
              <li className={styles.price}>
                <strong>Price</strong>
                <input
                  type="text"
                  value={currentFilters.lowerPrice}
                  placeholder="min"
                  onChange={(event): void =>
                    handlePriceChange(event, 'lowerPrice')
                  }
                />
                <input
                  type="text"
                  placeholder="max"
                  value={currentFilters.higherPrice}
                  onChange={(event): void =>
                    handlePriceChange(event, 'higherPrice')
                  }
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
