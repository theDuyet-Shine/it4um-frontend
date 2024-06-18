import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import TextEditor from "../TextEditor";

const CommentPool = ({ onClose }) => {
  const [editorContent, setEditorContent] = useState("");
  const handleComment = () => {
    console.log("Nội dung bình luận:", editorContent);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  return (
    <div className="bg-white p-4">
      <div className="flex justify-end">
        <AiOutlineClose className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="mt-4">
        <TextEditor onChange={handleEditorChange} />
        <button className="button" onClick={handleComment}>
          Bình luận
        </button>
      </div>
      <div className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        consectetur aliquam pharetra. Donec id lectus nisl. Donec fringilla ante
        sed purus vehicula, vitae volutpat arcu vulputate. Aenean eget rhoncus
        augue. Proin ex lacus, hendrerit non ullamcorper vitae, bibendum at
        magna. Curabitur metus dolor, imperdiet vel pretium nec, commodo in
        elit. Nullam vestibulum placerat eleifend. Duis lobortis dignissim
        lectus, at pellentesque orci fermentum malesuada. Vivamus lacinia et
        mauris maximus tincidunt. Cras luctus ligula vitae orci congue porta.
        Suspendisse metus erat, pretium vel mi quis, eleifend dictum orci. Sed
        laoreet eleifend lectus, ultrices ultrices risus laoreet a. Integer nec
        ex facilisis orci accumsan interdum. Sed elementum molestie neque, sed
        egestas risus dignissim sed. Suspendisse lorem ex, fringilla sit amet
        felis eu, mattis imperdiet elit. Interdum et malesuada fames ac ante
        ipsum primis in faucibus. Quisque faucibus interdum est. Mauris risus
        metus, molestie condimentum metus id, eleifend iaculis ex. Integer
        vulputate leo vel est vehicula tincidunt. Sed pharetra facilisis nibh
        vitae feugiat. Integer mauris enim, gravida quis ante quis, malesuada
        volutpat purus. Suspendisse erat justo, luctus nec dignissim sed,
        convallis vel libero. Integer iaculis consectetur consectetur.
        Vestibulum at ultricies metus, ut fermentum odio. Sed laoreet felis sed
        erat pellentesque molestie. Donec ac hendrerit dolor, nec fermentum
        nisl. Suspendisse lectus ante, porta eget tristique et, dapibus sed
        ante. In a dui vel sem feugiat gravida. Duis vel odio eget sem elementum
        vehicula non eget velit. Aliquam nec lacus non magna condimentum aliquam
        et vitae ligula. Mauris pellentesque felis a neque tempor eleifend.
        Suspendisse ultricies erat eget facilisis dictum. Integer lectus purus,
        finibus in quam vitae, interdum auctor sapien. Curabitur fringilla
        accumsan convallis. Morbi maximus ligula in gravida semper. Ut rutrum
        nulla lobortis libero posuere, nec aliquam justo tincidunt. In elementum
        ipsum nulla, nec mollis diam viverra ac. Proin ullamcorper bibendum
        nisi, eget porta lorem feugiat sit amet. Aliquam vehicula pretium
        ultrices. Curabitur consequat ante nulla, eget efficitur nulla dictum
        nec. Nulla facilisi. Vestibulum auctor erat non ligula aliquet, eu
        egestas velit imperdiet. Duis non nibh tincidunt, hendrerit nisl vel,
        pellentesque enim. Morbi viverra odio non neque aliquam pharetra. Cras
        lacus arcu, ultricies quis tempor et, pellentesque vel arcu. Donec
        varius quam odio, sed pulvinar ex vulputate nec. Morbi sagittis quam non
        turpis pharetra fringilla sit amet a lectus. Vestibulum condimentum
        tincidunt quam sed gravida. Mauris sodales condimentum lectus in
        pulvinar. Nulla ultrices auctor quam at semper. Suspendisse auctor
        tincidunt consequat. Curabitur ut est non sem aliquet gravida. Curabitur
        lobortis felis a quam malesuada, a mollis diam accumsan. Quisque dictum
        at orci sed viverra. Cras tempus mi non velit consequat, ac dapibus
        augue faucibus. Sed ullamcorper vel elit eget vestibulum. Fusce ultrices
        consectetur enim, vel sollicitudin dui porttitor eu. Aenean nec elit
        tortor. Vivamus sed velit quam. Donec euismod tellus sed semper varius.
        Praesent consectetur tellus elit. Generated 5 paragraphs, 462 words,
        3220 bytes of Lorem Ipsum
      </div>
    </div>
  );
};

export default CommentPool;
