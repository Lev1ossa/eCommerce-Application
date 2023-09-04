import React, { useEffect, useState } from 'react';
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
import { CustomCategory } from '../../../../types/types';
import styles from './Sidebar.module.scss';

// eslint-disable-next-line max-lines-per-function
export function CatalogSidebar(props: {
  categoryFilter: (
    categoryID: string,
    foreign?: string,
    trademark?: string,
  ) => Promise<void>;
  brands: string[];
}): React.ReactElement {
  const { categoryFilter, brands } = props;
  const [productCategories, setProductCategories] = useState<CustomCategory[]>(
    [],
  );
  const [categoriesList, setCategoriesList] = useState<JSX.Element[]>([]);

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

  useEffect(() => {
    if (productCategories) {
      setCategoriesList(
        productCategories.map((category) => (
          <SubMenu
            key={category.key}
            label={category.name}
            onClick={(): Promise<void> => categoryFilter(category.id)}
          >
            {category.children.map((child) => (
              <MenuItem
                key={child.key}
                onClick={(): Promise<void> => categoryFilter(child.id)}
              >
                {child.name.replace('_', ' ')}
              </MenuItem>
            ))}
          </SubMenu>
        )),
      );
    }
  }, [productCategories, categoryFilter]);

  const brandsList = brands.map((brand: string) => (
    <li key={brand}>
      <input type="checkbox" />
      <span className="text">{brand}</span>
    </li>
  ));

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
                  <strong>Origin</strong>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Local</span>
                  </li>
                  <li>
                    <input type="checkbox" />
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
