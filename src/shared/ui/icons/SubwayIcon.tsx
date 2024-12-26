export const SubwayIcon = (props) => {
    const color = props.favorite === 'true' ? '#F04438' : '#727272';
    const fill = props.favorite === 'true' ? 'nonzero' : 'evenodd';
  
    return (
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<rect width="20" height="20" rx="10" fill="#3C00BA"/>
<path d="M7 7.23047H8.30714L9.98929 11.7198H10.0107L11.6929 7.23047H13V12.7698H12.0893V8.3769L10.4179 12.7698H9.58214L7.91071 8.3769V12.7698H7V7.23047Z" fill="white"/>
</svg>
    );
  }
  
  