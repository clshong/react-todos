import React = require('react');
import { useState } from 'react';
import './App.css';
type BooksProps = {
  id: number;
  name: string;
  date: string;
  price: number;
  count: number;
};

function App() {
  // 定义数据
  const [books, setBooks] = useState([
    {
      id: 1,
      name: 'react',
      date: '2008-01',
      price: 88.0,
      count: 2,
    },
    {
      id: 2,
      name: 'html',
      date: '2006-07',
      price: 82.0,
      count: 1,
    },
    {
      id: 3,
      name: 'javascript',
      date: '2008-10',
      price: 103.0,
      count: 3,
    },
    {
      id: 4,
      name: 'vue',
      date: '2015-01',
      price: 89.0,
      count: 2,
    },
  ]);

  // 购物车有数据时
  const renderEmptyTip = () => {
    return books.map((item, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.date}</td>
          <td>{item.price}</td>
          <td>
            <button
              className="btn"
              disabled={item.count < 1}
              onClick={() => {
                changeBookCount(index, -1);
              }}
            >
              -
            </button>
            {item.count}
            <button
              className="btn"
              onClick={() => {
                changeBookCount(index, 1);
              }}
            >
              +
            </button>
          </td>
          <td className="count">
            <button
              onClick={() => {
                removeBook(item);
              }}
            >
              移除
            </button>
          </td>
        </tr>
      );
    });
  };
  // 购物车为空
  const renderNull = () => {
    return <h2>购物车为空~</h2>;
  };

  // 修改书籍数量
  const changeBookCount = (index: number, count: number) => {
    const newBooks = [...books];
    newBooks[index].count += count;
    return setBooks([...newBooks]);
  };

  // 移除书籍
  const removeBook = (item: BooksProps) => {
    const newBooks = [...books];
    setBooks(newBooks.filter((v) => item !== v));
  };

  // 价格汇总
  const BooksPrices = () => {
    const prices = formatPrice(
      books.reduce((prev, item) => {
        return prev + item.count * item.price;
      }, 0)
    );

    return prices;
  };

  // 处理价格格式
  const formatPrice = (price: any) => {
    if (typeof price !== 'number') {
      price = Number('aaa') || 0;
    }
    return '￥' + price.toFixed(2);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>书籍名称</th>
            <th>出版日期</th>
            <th>价格</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>{books.length > 0 ? renderEmptyTip() : renderNull()}</tbody>
      </table>
      <h2 className="prices">总价格：{BooksPrices()}</h2>
    </>
  );
}

export default App;
