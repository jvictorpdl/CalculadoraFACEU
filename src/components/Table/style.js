import styled from 'styled-components';

export const StiledTable = styled.table`
width: 100%;

tr{
    width:100px;
	width:100%;
    text-align: center;
    background-color: #FFFFFF;
    font-size:16px;
    border-bottom: 1px solid #E5E7EB; 


}
tr:last-child {
    border-bottom: none;
  }
th{
    padding: 8px;
    margin: 4px;
    background-color: #F3F4F6;
    font-weight: bolder;
    color: #4B5563;
    font-size:18px;
    align-text: left;


}
td{
    padding: 12px 16px;
    color: #374151;

}
sub{
    font-size:12px;
}
sup{
    font-size:12px;
}
`
