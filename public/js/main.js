var global_last_word = "";
var aleady_submit = false;

$(function(){
    $("input").mouseup(function(){
        $(".content-wrap .answer").addClass("on");
        // $(".content-wrap .content .right-answer").addClass("on");  //test
    });
    $(".wrap").mouseup(function(e){
        var target_area = $(".answer");
        if(e.target.nodeName != "INPUT" && !target_area.is(e.target) && target_area.has(e.target).length === 0)
        {
            $(".content-wrap .answer").removeClass("on");
        }
    });
    $(".wrap .content-wrap li").click(function(){
        if(!$(this).hasClass("done"))
        {
            $(".option").each(function(){
                if($.trim($(this).text()) === global_last_word)
                {
                    $(this).addClass("line-through");
                    $(this).removeClass("font-color-on");
                }
            });
        }
        else
        {
            if($(".wrap .answer li.on").length < 2)
            {
                $(".option.font-color-on").addClass("line-through");
                $(".option.font-color-on").removeClass("font-color-on");
            }
            var del_line_through = "#answer-" + $(this).text();
            console.log(del_line_through + "del_line_through");
            $(".option").each(function(){
                if($.trim($(this).text()) === $(del_line_through).val())
                {
                    $(this).removeClass("line-through");
                }
            });
            $(del_line_through).val("");
            $(this).removeClass("done");
            global_last_word = "";
            
        }
        $(".wrap .content-wrap li").removeClass("on");
        if(!$(this).hasClass("on"))
        {
            $(this).addClass("on");
            $("#current-choose").val($(this).text());
        }
        //解析
        if(aleady_submit)
        {
            $(".wrap .analysis li").hide();
            var count = $(this).text();
            $(".wrap .analysis li:eq(" + (count - 1) + ")").show();
        }
    });
    $(".wrap .content-wrap .option").mouseup(function(){
        console.log($(this));
        
        if($("#current-choose").val() == "")
        {
            alert("请选择题号")
        }
        else
        {
            if(!$(this).hasClass("line-through"))
            {
                $(".wrap .content-wrap .option").removeClass("font-color-on");
                if(!$(this).hasClass("font-color-on"))
                {
                    $(this).addClass("font-color-on");
                    var li_count = parseInt($("#current-choose").val()) - 1;
                    $(".wrap .content-wrap li:eq(" + li_count + ")").addClass("done");
                }
                var word = $(this).text();
                word = $.trim(word);
                global_last_word = word;
                console.log("word" + typeof(word));
                var count = $("#current-choose").val();
                console.log(typeof(count));
                var which_filling = '#answer-' + count;
                console.log(which_filling);
                $(which_filling).val(word);
                console.log($(which_filling).val());
            }
            else
            {
                alert("答案已被选");
            }
            
        }
    });
    $("#submit-btn").click(function(){
        var error = false; 
        $(".your-answer").each(function(){
            if($(this).val() == "")
            {
                alert("请填完所有答案");
                error = true;
                return false;
            }
        });
        if(!error)
        {
            $(".wrap .content .right-answer").addClass("on");
            var count = $(".wrap .content .right-answer").length;
            console.log(count);
            for(var num = 1;num <= count; num++)
            {
                var answer = "#answer-" + num;
                var right_answer = "#right-answer-" + num;
                console.log($(right_answer));
                if($(answer).val() == $(right_answer).val())
                {
                    console.log($(answer).val());
                    console.log($(answer));
                    $(answer).css({"color" : "#66d3bf"});
                    $(".wrap .content-wrap .answer li:eq(" + (num - 1) + ")").removeClass("done on").addClass("right");
                }
                else
                {
                    $(answer).css({"color" : "#da4e4e"});
                    $(answer).addClass("line-through");
                    $(".wrap .content-wrap .answer li:eq(" + (num - 1) + ")").removeClass("done on").addClass("false");
                }

            }
            $(".answer-area").hide();
            $("#submit-btn").hide();
            $(".wrap").unbind("mouseup");
            aleady_submit = true;
        }
        
    });
});