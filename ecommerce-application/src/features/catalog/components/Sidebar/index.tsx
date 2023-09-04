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
  });
  // const [originFilters, setOriginFilters] = useState({
  //   foreigh: false,
  //   local: false,
  // });
  const [brandsList, setBrandsList] = useState<JSX.Element[]>([]);

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
      console.log('value', value);

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

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
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
            // position: 'sticky',
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
          {categoriesList}
          <SubMenu label="Filters" defaultOpen>
            <ul className={styles.list}>
              <li className={styles.price}>
                <strong>Price</strong>
                <input type="text" placeholder="min" />
                <input type="text" placeholder="max" />
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
