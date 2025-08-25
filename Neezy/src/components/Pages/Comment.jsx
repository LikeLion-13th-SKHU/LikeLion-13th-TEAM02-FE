import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import styled from "styled-components";

const Root = styled.div`
  width: 375px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
  padding-bottom: 60px; /* 네브바 높이만큼 패딩 추가 */
  text-align: center;
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("BOWLING"); // 초기 값
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryOptions = [
    "BOWLING",
    "ICECREAM",
    "PASTA",
    "CAFE",
    "RESTAURANT",
    "BOOKSTORE",
    "GYM",
    "MOVIE",
    "HOTEL",
    "PARK",
  ];

  useEffect(() => {
    const storedRegion = localStorage.getItem("region");
    if (storedRegion) {
      setRegion(storedRegion);
    }
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
        const sorted = data.sort(
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

    // 선택된 카테고리를 로컬스토리지에 저장
    localStorage.setItem("category", category);

    const postData = {
      title,
      contents,
      region,
      category,
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

      const newComment = await response.json();

      setComments((prev) => [newComment, ...prev]);
      setTitle("");
      setContents("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Root>
      <Header />
      <Main>
        <h1>{region}</h1>

        {loading && <p>데이터를 불러오는 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Section>
          {comments.length === 0 && !loading ? (
            <p>등록된 코멘트가 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <CommentBox key={comment.id}>
                <h3>{comment.title}</h3>
                <p>{comment.contents}</p>
                <small>
                  {comment.category} |{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </CommentBox>
            ))
          )}
        </Section>

        <Section mt="24px">
          <h2>코멘트 작성하기</h2>
          <form onSubmit={handleSubmit}>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="카테고리 선택"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
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
      </Main>
      <Nav />
    </Root>
  );
}
