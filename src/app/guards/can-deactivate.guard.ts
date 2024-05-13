import { CanDeactivateFn } from '@angular/router';
import { ICanLeavePage } from '../models/Can-Leave-page';


export const CanDeactivatePage: CanDeactivateFn<ICanLeavePage> = (
  component: ICanLeavePage
) => {
  return component.canLeavePage ? component.canLeavePage() : true;
};
