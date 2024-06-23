// pagination 컴포넌트.
// 한 페이지에 보여줄 포스트의 개수를 정하고, 그에 따라 페이지네이션을 만들어주는 컴포넌트이다.
// 한 페이지 최대 포스트 개수 : 9개
// 페이지 개수 계산 공식 : Math.ceil(전체 포스트 개수 / 한 페이지 최대 포스트 개수)
// 페이지네이션은 1부터 시작한다.
// 페이지네이션을 클릭하면 해당 페이지의 포스트를 보여준다.
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import HorizontalView from './HorizontalView';
import SearchBar from './SearchBar';
import { selectedBoardIdAtom } from '../../atoms/selectBoardId';
import { articlesAtom } from '../../atoms/articlesAtom';
// import { apiInstanceWithoutToken } from '../../api/apiInstance';

function Pagination({ postDatas }) {
  // const [postDatas, setPostDatas] = useAtom(articlesAtom);

  const postCount = postDatas.articles.rows.length || 0;
  const postPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(postCount / postPerPage);

  // 현재 페이지에서 보여줄 포스트들
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPostArr = postDatas.articles.rows || [];
  const currentPosts = currentPostArr.slice(indexOfFirstPost, indexOfLastPost);
  // articleData.rows가 없다면, currentPosts는 없다.

  // 페이지 이동
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 이전 페이지 이동
  const prevPage = () => {
    setCurrentPage((currentPage) => (currentPage - 1 > 0 ? currentPage - 1 : currentPage));
  };

  // 다음 페이지 이동
  const nextPage = () => {
    setCurrentPage((currentPage) => (currentPage + 1 <= pageCount ? currentPage + 1 : currentPage));
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 h-[18.75rem] w-[52rem] rounded-lg bg-white">
        <img src="/src/assets/dva.png" className="w-full rounded-lg shadow-md" alt="banner img" />
      </div>
      <SearchBar />
      {/* 조건부 렌더링 */}
      <div className="h-auto rounded-lg">
        <HorizontalView posts={currentPosts} />
      </div>
      {/* 페이지네이션 */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        {postCount > 9 && (
          <button
            onClick={prevPage}
            className="rounded-md border bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            이전
          </button>
        )}

        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`rounded-md border px-4 py-2 ${currentPage === index + 1 ? 'bg-yel text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        {postCount > 9 && (
          <button
            onClick={nextPage}
            className="rounded-md border bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
