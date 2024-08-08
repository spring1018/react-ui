import Editor from "@/components/molecules/Editor";

export default function Page() {
  const initialContent = JSON.stringify([
    {
      id: "d170ceeb-c1e4-4960-88b3-0e5e020d1e59",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [
        {
          type: "text",
          text: "Welcome to this demo!",
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: "009176e6-35c9-41cd-8cd3-95e08065d5fc",
      type: "heading",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "This is a heading block",
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: "e733d08b-21f1-4c61-8916-ed1004150eb1",
      type: "bulletListItem",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [
        {
          type: "text",
          text: "afas:lfjakas:dlfja:lkjl:kjasdklfja:slkjdf:lkjasdfa:sldkfja:lsdkjfk:lajsdlfja:sdfj:ajsdff",
          styles: {},
        },
      ],
      children: [
        {
          id: "d306bb43-55a6-4080-9941-9c9183a04e97",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "a1",
              styles: {},
            },
          ],
          children: [
            {
              id: "b9b09d6b-faba-45c9-98f1-d881927054ca",
              type: "bulletListItem",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
              },
              content: [
                {
                  type: "text",
                  text: "a11",
                  styles: {},
                },
              ],
              children: [],
            },
            {
              id: "20a3890c-cb63-4f09-93e0-6bcf9adeef87",
              type: "bulletListItem",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
              },
              content: [
                {
                  type: "text",
                  text: "a12",
                  styles: {},
                },
              ],
              children: [],
            },
            {
              id: "14a49653-7a5b-48ee-a0d0-4d5018d74d35",
              type: "bulletListItem",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
              },
              content: [
                {
                  type: "text",
                  text: "a13",
                  styles: {},
                },
              ],
              children: [],
            },
          ],
        },
        {
          id: "98d67b97-cc79-4b56-92c2-f8a81e71151e",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "a2",
              styles: {},
            },
          ],
          children: [],
        },
      ],
    },
    {
      id: "a716cc10-75f7-436f-bf8c-e6d1a83308c8",
      type: "bulletListItem",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [
        {
          type: "text",
          text: "b",
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: "1a37a3e1-6f50-4e93-94a7-f461612f1fb9",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    },
  ]);

  return (
    <div className="grid grid-cols-3">
      <Editor initialContent={initialContent} mode="edit" />
      <div className="col-span-2">{null}</div>
    </div>
  );
}
