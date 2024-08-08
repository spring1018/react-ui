import ShowMore from "@/components/atoms/ShowMore";

export default function Page() {
  return (
    <div className="space-y-4">
      <ShowMore>
        <p>
          This is a sample content. It will be truncated if it exceeds the
          maximum height.
        </p>
        <p>Additional content line 1</p>
        <p>Additional content line 2</p>
        <p>Additional content line 3</p>
        <p>Additional content line 4</p>
        <p>Additional content line 5</p>
        <p>Additional content line 6</p>
        <p>Additional content line 7</p>
        <p>Additional content line 8</p>
      </ShowMore>
    </div>
  );
}
