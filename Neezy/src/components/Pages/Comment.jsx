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
`;

export default function Comment({ region }) {
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("BOWLING"); // 필요시 선택 가능하게 확장 가능
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!region) return;
    setLoading(true);
    setError(null);
    fetch(`https://junyeong.store/api/posts/region/${region}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
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
    if (!memberId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const postData = {
      title,
      contents,
      region,
      category,
    };

    try {
      const response = await fetch(`/api/posts/${memberId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

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

        <Section width="90%" mt="24px">
          <h2>코멘트 작성하기</h2>
          <form onSubmit={handleSubmit}>
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
