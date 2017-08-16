/*
 * @file component Deskmark
 */

import React from 'react';
import uuid from 'uuid';

import CreateBar from '../CreateBar';
import List from '../List';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';

import './Deskmark.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedId: null,
      editing: false,
    };

    this.selectItem = this.selectItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  createItem() {//创建文章
      this.setState({
        selectedId: null,//没有选中的文章
        editing: true,//编辑器状态为true
      });
  }

  saveItem(item) {//添加文章或者编辑文章，item参数内容是编辑框里的内容，title和content
    let items = this.state.items;

    // new item
    if (!item.id) {//如果不存在这个文章，那么判断为不是在编辑文章，是在创建新的文章
      items = [...items, {//在文章数据列表中添加新的数据
        ...item,
        id: uuid.v4(),
        time: new Date().getTime(),
      }];
    // existed item
    } else {//如果存在这个文章，那就是为编辑状态
      items = items.map(
        exist => (//找到这个文章
          exist.id === item.id
          ? {
            ...exist,
            ...item,//更新文章内容
          }
          : exist//不改变
        )
      );
    }
    this.setState({
      items,
      selectedId: item.id,
      editing: false,
    });
  }

  cancelEdit() {//取消编辑
    this.setState({ editing: false });
  }


  selectItem(id) {
    if (id === this.state.selectedId) {
      return;
    }

    this.setState({
      selectedId: id,
      editing: false,
    });
  }

  deleteItem(id) {
    if (!id) {
      return;
    }

    this.setState({
      items: this.state.items.filter(
        result => result.id !== id
      ),
    });
  }

  
  editItem(id) {
    this.setState({
      selectedId: id,
      editing: true,
    });
  }



  render() {
    const { items, selectedId, editing } = this.state;
    const selected = selectedId && items.find(item => item.id === selectedId);
    const mainPart = editing
      ? (
        <ItemEditor
          item={selected}
          onSave={this.saveItem}
          onCancel={this.cancelEdit}
        />
      )
      : (
        <ItemShowLayer
          item={selected}
          onEdit={this.editItem}
          onDelete={this.deleteItem}
        />
      );

    return (
      <section className="deskmark-component">
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <a className="navbar-brand" href="#">Deskmark App</a>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-4 list-group">
              <CreateBar onClick={this.createItem} />
              <List
                items={this.state.items}
                onSelect={this.selectItem}
              />
            </div>
            {mainPart}
          </div>
        </div>
      </section>
    );
  }
}