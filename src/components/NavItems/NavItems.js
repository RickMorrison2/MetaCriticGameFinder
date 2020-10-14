import React from 'react';
import { SearchSVGIcon, FavoriteSVGIcon } from '@react-md/material-icons';

/**
 * Note: The `parentId` **must** be defaulted to `null` for the navigation tree
 * to render correctly since this uses the @react-md/tree package behind the
 * scenes. Each item that has a `parentId` set to `null` will appear at the root
 * level of your navigation tree.
 */
const createRoute = (
    pathname,
    children,
    leftAddon = undefined,
    parentId = null
) => {
    return {
        itemId: pathname,
        parentId,
        to: pathname,
        children,
        leftAddon,
    };
};

const navItems = {
    '/': createRoute('/', 'Search', <SearchSVGIcon />),
    '/favorites': createRoute('/favorites', 'Favorites', <FavoriteSVGIcon />),
};

export default navItems;
