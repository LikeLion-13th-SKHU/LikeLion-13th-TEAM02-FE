import React, { useEffect, useState } from "react";
import Select from "react-select";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Root = styled.div`
  width: 375px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background-color: white;

  @media (max-width: 400px) {
    width: 320px;
    height: 568px;
  }
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 160px; /* 고정된 코멘트 입력 공간 만큼 패딩 */
  text-align: center;
  margin-top: 35px;
`;

const Section = styled.section`
  margin-top: ${({ mt }) => mt || "0"};
  width: 90%;
`;

const CommentBox = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid orange;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Writer = styled.div`
  font-weight: 900;
  font-size: 17px;
  color: black;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  color: #777;
  margin-left: auto; /* 우측 정렬 */
`;

const Contents = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #555;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  text-align: left;
`;
const CategoryLabel = styled.div`
  font-size: 12px;
  margin-left: 5px;
  margin-top: 5px;
  color: #999; /* 연한 회색 */
  font-weight: 600;
`;
const TitleInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  resize: none;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
`;

const BackButton = styled.button`
  position: absolute;
  top: 60px;
  left: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  color: black;

  &:hover {
    color: #3458d1;
  }
`;

const CommentFormWrapper = styled.div`
  position: fixed;
  bottom: 60px; /* 네비게이션 바로 위 */

  width: 340px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 16px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1500;
  align-items: center;
  text-align: center;

  @media (max-width: 400px) {
    width: 320px;
  }
`;

const categoryOptions = [
  { value: "KOREAN", label: "한식" },
  { value: "CHICKEN", label: "치킨집" },
  { value: "PIZZA", label: "피자가게" },
  { value: "BURGER", label: "햄버거집" },
  { value: "SNACK_BAR", label: "분식집" },
  { value: "JAPANESE", label: "일식" },
  { value: "CHINESE", label: "중식" },
  { value: "WESTERN", label: "양식" },
  { value: "BBQ", label: "고기집" },
  { value: "CAFETERIA", label: "백반집" },
  { value: "DESSERT", label: "디저트 전문점" },
  { value: "CAFE", label: "카페" },
  { value: "BAKERY", label: "빵집" },
  { value: "PC_ROOM", label: "PC방" },
  { value: "KARAOKE", label: "노래방" },
  { value: "BOWLING", label: "볼링장" },
  { value: "BILLIARD", label: "당구장" },
  { value: "ARCADE", label: "오락실" },
  { value: "ESCAPE_ROOM", label: "방탈출" },
  { value: "VR_ZONE", label: "VR 체험관" },
  { value: "MOVIE_THEATER", label: "영화관" },
  { value: "SPORTS_COMPLEX", label: "스포츠 시설" },
  { value: "GYM", label: "헬스장" },
  { value: "YOGA_PILATES", label: "요가/필라테스" },
  { value: "CONVENIENCE_STORE", label: "편의점" },
  { value: "MART", label: "대형마트" },
  { value: "SUPERMARKET", label: "슈퍼마켓" },
  { value: "PHARMACY", label: "약국" },
  { value: "HOSPITAL", label: "병원" },
  { value: "CLINIC", label: "의원" },
  { value: "DENTAL", label: "치과" },
  { value: "VET", label: "동물병원" },
  { value: "HAIR_SHOP", label: "미용실" },
  { value: "NAIL_SHOP", label: "네일샵" },
  { value: "STUDY_CAFE", label: "스터디카페" },
  { value: "LIBRARY", label: "도서관" },
  { value: "ACADEMY", label: "학원" },
  { value: "BANK", label: "은행" },
  { value: "POST_OFFICE", label: "우체국" },
  { value: "CULTURE_CENTER", label: "문화센터" },
  { value: "KIDS_CARE", label: "어린이집/유치원" },
  { value: "ETC", label: "기타" },
];

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedRegion = localStorage.getItem("region");
    if (storedRegion) setRegion(storedRegion);
  }, []);

  useEffect(() => {
    if (!region) return;

    setLoading(true);
    setError(null);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    fetch(`https://junyeong.store/api/posts/region/${region}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");
        return res.json();
      })
      .then((data) => {
        const sorted = data.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComments(sorted);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [region]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !contents.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const memberId = localStorage.getItem("memberId");
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    localStorage.setItem("category", category.value);

    const postData = {
      title,
      contents,
      region,
      category: category.value,
    };

    try {
      const response = await fetch(
        `https://junyeong.store/api/posts/${memberId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("코멘트 등록에 실패했습니다.");
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const newComment = await response.json();
        setComments((prev) => [newComment, ...prev]);
      } else {
        const text = await response.text();
        alert(text);
      }

      setTitle("");
      setContents("");
    } catch (err) {
      alert(err.message);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Root>
      <Header />
      <BackButton onClick={goBack} aria-label="뒤로가기">
        ←
      </BackButton>
      <Main>
        {loading && <p>데이터를 불러오는 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Section>
          {comments.length === 0 && !loading ? (
            <p>등록된 코멘트가 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <CommentBox key={comment.postId}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Writer>{comment.writer}</Writer>
                  <CategoryLabel>{comment.category}</CategoryLabel>
                  <CreatedAt>
                    {new Date(comment.createdAt).toLocaleString()}
                  </CreatedAt>
                </div>
                <Contents>{comment.contents}</Contents>
              </CommentBox>
            ))
          )}
        </Section>
      </Main>
      <CommentFormWrapper>
        <Section mt="0">
          <h2>코멘트 작성하기</h2>
          <form onSubmit={handleSubmit}>
            <Select
              options={categoryOptions}
              value={category}
              onChange={(selected) => setCategory(selected)}
              isSearchable={true}
              placeholder="카테고리를 선택하세요"
            />
            <TitleInput
              type="text"
              value={title}
              placeholder="글 제목을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
            />
            <ContentTextarea
              rows="4"
              value={contents}
              placeholder={`${region} 관련 코멘트를 입력하세요`}
              onChange={(e) => setContents(e.target.value)}
            />
            <br />
            <SubmitButton type="submit">등록</SubmitButton>
          </form>
        </Section>
      </CommentFormWrapper>
      <Nav />
    </Root>
  );
}
