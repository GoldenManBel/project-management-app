import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux-hooks/redux-hooks';
import { getColumns } from '../../api/columns';
import loadingAnimation from '../../components/loading-animation/LoadingAnimation';
import Column from '../../components/columns/Column';
import { IColumn } from '../../models/IColumn';
import Header from '../../components/header/Header';
import ColumnModal from '../../components/column-modal/ColumnModal';

const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, columns, boardId } = useAppSelector((state) => state.columns);
  const [isOpenColumn, setIsOpenColumn] = useState(false);

  useEffect(() => {
    dispatch(getColumns(boardId));
  }, [columns.length]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.board}>
        {error && <h3 className={styles.error}>{error}</h3>}
        {isLoading && <div className={styles.loader}>{loadingAnimation()}</div>}
        <Link className={styles.buttonBack} to="/main">
          Go back
        </Link>
        {columns.map((column: IColumn, index: number) => {
          return <Column column={column} key={index} />;
        })}
        <button className={styles.buttonAddColumn} onClick={() => setIsOpenColumn(true)}>
          add column
        </button>
        <ColumnModal isOpenColumn={isOpenColumn} setIsOpenColumn={setIsOpenColumn} />
      </div>
    </div>
  );
};

export default BoardPage;