package com.study.myproject02.guestbook.controller;

import com.study.myproject02.common.vo.DataVO;
import com.study.myproject02.guestbook.service.GuestBookService;
import com.study.myproject02.guestbook.vo.GuestBookVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/guestbook")
public class GuestBookController {
    @Autowired
    private GuestBookService guestBookService;

    @GetMapping("/list")
    public DataVO getGuestBooklist(){
        DataVO dataVO = new DataVO();
        try{
          List<GuestBookVO> gustbookList =  guestBookService.guestBookList();
          if(gustbookList == null || gustbookList.isEmpty()){
              dataVO.setSuccess(Boolean.TRUE);
              dataVO.setMessage("데이터가 없습니다");
          }else{
              dataVO.setSuccess(Boolean.TRUE);
              dataVO.setMessage("데이터 불러오기 성공");
              dataVO.setData(gustbookList);
          }
        }catch (Exception e){
           log.error("방명록 목록 조회 실패", e);
           dataVO.setSuccess(Boolean.FALSE);
           dataVO.setMessage("방명록 목록을 불러오지 못했습니다.");
        }
        return dataVO;
    }

    @PostMapping("/insert")
    public DataVO getGuestBookInsert(@RequestBody GuestBookVO gvo){
        DataVO dataVO = new DataVO();
        try{
            // 비밀번호 암호화 하기 (Service 에서 하자 )
           int result = guestBookService.guestBookInsert(gvo);
           if(result == 0){
               dataVO.setSuccess(Boolean.FALSE);
               dataVO.setMessage("등록 실패");
           }else{
               dataVO.setSuccess(Boolean.TRUE);
               dataVO.setMessage("등록 성공");
           }
        }catch (Exception e){
            log.error("방명록 등록 실패", e);
            dataVO.setSuccess(Boolean.FALSE);
            dataVO.setMessage("방명록을 등록하지 못했습니다.");
        }
        return dataVO;
    }

    @PostMapping("/update")
    public DataVO getGuestBookDetail(@RequestBody GuestBookVO gvo){
        DataVO dataVO = new DataVO();
        try{
          int result = guestBookService.guestBookUpdate(gvo);
          if(result == 0){
              dataVO.setSuccess(Boolean.FALSE);
              dataVO.setMessage("수정 실패");
          }else{
              dataVO.setSuccess(Boolean.TRUE);
              dataVO.setMessage("수정 성공");
          }
        }catch (IllegalArgumentException e){
            dataVO.setSuccess(Boolean.FALSE);
            dataVO.setMessage(e.getMessage());
        }catch (Exception e){
            log.error("방명록 수정 실패", e);
            dataVO.setSuccess(Boolean.FALSE);
            dataVO.setMessage("방명록을 수정하지 못했습니다.");
        }
        return dataVO;
    }

    @PostMapping("/delete")
    public DataVO getGuestBookDelete(@RequestBody GuestBookVO gvo){
        DataVO dataVO = new DataVO();
        try {
            int result = guestBookService.guestBookDelete(gvo);
            if(result == 0){
                dataVO.setSuccess(Boolean.FALSE);
                dataVO.setMessage("삭제 실패");
            }else{
                dataVO.setSuccess(Boolean.TRUE);
                dataVO.setMessage("삭제 성공");
            }
        } catch (IllegalArgumentException e) {
            dataVO.setSuccess(Boolean.FALSE);
            dataVO.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("방명록 삭제 실패", e);
            dataVO.setSuccess(Boolean.FALSE);
            dataVO.setMessage("방명록을 삭제하지 못했습니다.");
        }
        return dataVO;
    }
}
