import React from 'react';
import {IconBuilderProps, IconButton} from '../../components';

/**
 * small util to generate a functions useful for components that need a default
 * @param action
 * @returns () => void
 */
export function generateAction(action?: () => void) {
  /**
   * if we have a action from props use it
   */
  if (action) {
    return () => action();
  }
  /**
   * returning an empty option function here to not break the ui;
   */
  return () => {};
}

/**
 * Small util to render a header actions
 * @param action
 * @param headerAction
 */
export function renderAction(
  action?: (() => JSX.Element) | IconBuilderProps,
  headerAction?: () => void,
) {
  /**
   * if action is equal to a function it means
   * that we can pass a function that renders a custom JSX.Element
   */
  if (action && typeof action === 'function') {
    return action();
  }

  /**
   * if action is equal to an object it means
   * that we are using the IconBuilder Options
   */
  if (action && typeof action === 'object') {
    return <IconButton {...action} onPress={generateAction(headerAction)} />;
  }

  /**
   * if no option we return null to not break the ui
   */
  return null;
}
