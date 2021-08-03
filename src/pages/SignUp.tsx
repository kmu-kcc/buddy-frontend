import React from 'react';

export const SignUp: React.FC = () => {
  return (
    <div>
      <div>학번을 입력해주세요</div>
      <input placeholder='학번'></input>
      <br></br>
      <br></br>
      <div>비밀번호를 입력해주세요</div>
      <input placeholder='비밀번호'></input>
      <br></br>
      <br></br>
      <div>비밀번호를 다시한번 입력해주세요</div>
      <input placeholder='비밀번호 재입력'></input>
      <button>비밀번호 확인</button>
      <br></br>
      <br></br>
      <div>대학를 선택해주세요</div>
      <select name='학부' id='major-check'>
        <option value=''>----------------------------------</option>
        <option value='글로벌인문지역대학'>글로벌인문지역대학</option>
        <option value='사회과학대학'>사회과학대학</option>
        <option value='법과대학'>법과대학</option>
        <option value='경상대학'>경상대학</option>
        <option value='경영대학'>경영대학</option>
        <option value='창의공과대학'>창의공과대학</option>
        <option value='과학기술대학'>과학기술대학</option>
        <option value='예술대학'>예술대학</option>
        <option value='체육대학'>체육대학</option>
        <option value='조형대학'>조형대학</option>
        <option value='소프트웨어융합대학'>소프트웨어융합대학</option>
        <option value='건축대학'>건축대학</option>
        <option value='자동차융합대학'>자동차융합대학</option>
        <option value=''>----------------------------------</option>
      </select>
      <br></br>
      <br></br>
      <div>소속학과를 입력해주세요</div>
      <input placeholder='소속학과'></input>
      <br></br>
      <br></br>
      <div>학년을 선택해주세요</div>
      <select name='SchoolYear' id='year check'>
        <option value=''>----</option>
        <option value='Freshman'>1</option>
        <option value='Sophemore'>2</option>
        <option value='junior'>3</option>
        <option value='senior'>4</option>
        <option value='other'>그 외</option>
        <option value=''>----</option>
      </select>
      <br></br>
      <br></br>
      <div>핸드폰 번호를 입력해주세요</div>
      <input placeholder='핸드폰 번호 입력'></input>
      <br></br>
      <br></br>
      <div>이메일을 입력해주세요</div>
      <input placeholder='이메일 입력'></input>
      <br></br>
      <br></br>
      <div>휴학 여부를 선택해주세요</div>
      <select name='휴학' id='M-Term'>
        <option value='true'>휴학</option>
        <option value='false'>재학</option>
      </select>
    </div>
  );
};

/* SignUp function list
  (block page)

 - interactive web (not like apple just like sink with scroll)

 - ID(school number) check

 - school year (freshman, junior, sophermore, )

 - Password double check (pwd == pwdCheck)

 - Phone num & email(optional)

 - name

 - auth class

 - on school or not

*/
