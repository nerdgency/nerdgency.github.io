/**
 * Registers the documentation components for every MDX page, so a doc
 * can use <Example>, <Output>, <Steps> and friends without importing
 * them. Swizzled (wrapped) from @docusaurus/theme-classic.
 */
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Example from '@site/src/components/docs/Example';
import CapturedExample from '@site/src/components/docs/CapturedExample';
import CapturedResponse from '@site/src/components/docs/CapturedResponse';
import Output from '@site/src/components/docs/Output';
import {Steps, Step} from '@site/src/components/docs/Steps';
import Param from '@site/src/components/docs/Param';
import {VersionNotice, Since} from '@site/src/components/docs/VersionNotice';
import Screenshot from '@site/src/components/docs/Screenshot';
import {Cards, CardLink} from '@site/src/components/docs/Cards';
import * as Reference from '@site/src/components/docs/Reference';

export default {
  ...MDXComponents,
  Tabs,
  TabItem,
  Example,
  CapturedExample,
  CapturedResponse,
  Output,
  Steps,
  Step,
  Param,
  VersionNotice,
  Since,
  Screenshot,
  Cards,
  CardLink,
  ...Reference,
};
