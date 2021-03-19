import Vue from 'vue'
import {ConfigProvider,Row,Col,Button,Input, Avatar, Dropdown, Menu, Empty, Tooltip, BackTop, Tag, Pagination, Tabs,FormModel, Checkbox, Modal, Comment, Card,message, List, Icon,Upload, Radio, Timeline} from 'ant-design-vue'

Vue.use(ConfigProvider).use(Row).use(Col).use(Input).use(Button).use(Avatar).use(Dropdown).use(Menu).use(Empty).use(Tooltip).use(BackTop).use(Tag).use(Pagination).use(Tabs).use(FormModel).use(Checkbox).use(Comment).use(Card).use(Modal).use(List).use(Upload).use(Radio).use(Timeline).use(Icon)

import Moment from 'moment'

Vue.prototype.$Moment = Moment
Vue.prototype.$message = message