import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../specialPanel/specialPanel";
import { sanitizeContent } from "./utils";
import { savePostAsync } from "../../../../actions";
import styled from "styled-components";
import { PROP_TYPES } from "../../../../constants";

const PostFormConteiner = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(id, {
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then(({ id }) => navigate(`/post/${id}`));
  };

  const onImageUrlChange = ({ target }) => setImageUrlValue(target.value);
  const onTitleChange = ({ target }) => setTitleValue(target.value);

  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        placeholder="Изображение..."
        onChange={onImageUrlChange}
      />
      <Input
        value={titleValue}
        placeholder="Заголовок..."
        onChange={onTitleChange}
      />
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={
          <Icon
            id="fa-floppy-o"
            margin="0 10px 0 0"
            size="21px"
            onClick={onSave}
          />
        }
      />
      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text"
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormConteiner)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
    min-height: 80px;
    border: 1px solid black;
  }
`;

PostForm.propTypes = {
  post: PROP_TYPES.POST.isRequired,
};
