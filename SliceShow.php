<?php
/*
Plugin Name: SliceShow
Plugin URI: http://www.appchain.com/sliceshow
Description: A home page unique new jquery animated slideshow
Version: 1.0.6
Author: Turcu Ciprian
Author URI: http://appchain.com/
*/
//Get First Image
function xGetFirstImage($xContent) {
    $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $xContent, $matches);
    $first_img = $matches [1] [0];
    return $first_img;
}
//Get Content Info
function xContentInfo($xTitleLength, $xContentLength,$isArray=false) {
    $xContent = get_the_content();
    $xTitle = get_the_title();
    $xFImage = xGetFirstImage($xContent);
    $xContent = strip_tags($xContent);
    $xContent = strip_shortcodes( $xContent );
    $xContent = str_replace('[/caption]','',$xContent);

    if(strlen($xContent)>$xContentLength && $xContentLength!=0)
        $xContent = substr($xContent,0,$xContentLength)."...";
    if(strlen($xTitle)>$xTitleLength && $xTitleLength!=0)
        $xTitle = substr($xTitle,0,$xTitleLength)."...";
    //Image
    $postid = get_the_ID();

    if($isArray==false)
        $xFImageMeta = get_post_meta($postid, 'image',true);

    else {
        $xFImageMeta = get_post_meta($postid, 'image');
        if($xFImageMeta[0]=="")
            $xFImageMeta[0]= plugins_url('images/noimage.jpg',__FILE__);
        if($xFImageMeta[1]=="")
            $xFImageMeta[1]=plugins_url('images/noimage.jpg',__FILE__);
        if($xFImageMeta[2]=="")
            $xFImageMeta[2]=plugins_url('images/noimage.jpg',__FILE__);
    }

    $xLink = get_permalink($postid);

    if($xFImageMeta=="") {
        if($xFImage=="")
            $xFImage=plugins_url('images/noimage.jpg',__FILE__);
    }else {
        $xFImage = $xFImageMeta;
    }
    $xArray[0] = $xTitle;
    $xArray[1] = $xContent;
    $xArray[2] = $xFImage;
    $xArray[3] = $xLink;
    return $xArray;
}

function SliceShow_Slideshow() {
    global $xSSWidth;
    global $xSSHeight;
    ?>
<ul class="xSSSlideshow">
        <?php
        $xDBArr = unserialize(get_option('SliceShow_values'));
        $xSSCategory = stripslashes($xDBArr[0]);
        $xSSWidth = stripslashes($xDBArr[2]);
        $xSSHeight = stripslashes($xDBArr[3]);

        if($xSSHeight=="")
            $xSSHeight=floor(365*0.55);
        else
            $xSSHeight=floor($xSSHeight*0.55);

        if($xSSWidth=="")
            $xSSWidth=floor(995*0.6);
        else
            $xSSWidth=floor($xSSWidth*0.6);
        wp_reset_query();
        query_posts('cat='.$xSSCategory.'&showposts=5');
        $i=0;
        while(have_posts()) {
            the_post();
            $xContentArr = xContentInfo(0,300);
            $xCurrentClass=chr(64+$i+1);
            ?>
    <li>
        <a href="<?php echo $xContentArr[3];?>"><?php echo $xContentArr[0];?></a>
        <img src="<?php echo plugins_url('scripts/timthumb.php?src='.$xContentArr[2].'&amp;w='.$xSSWidth.'&amp;h='.$xSSHeight.'&amp;zc=1&amp;q=100',__FILE__); ?>" alt=""/>
    </li>
            <?php
        }
        wp_reset_query();
        ?>
    <li>
        <a href="#"></a>
        <img src="" alt=""/>
    </li>
</ul>
    <?php
}

//Add scripts for admin page
function SliceShow_adminPrintScripts() {
    $xDBArr = unserialize(get_option('SliceShow_values'));
    $xSSjQuery = stripslashes($xDBArr[1]);
    if($xSSjQuery=="on")
        wp_enqueue_script('jquery');

    $xSSWidth = stripslashes($xDBArr[2]);
    $xSSHeight = stripslashes($xDBArr[3]);
    if($xSSHeight=="")
        $xSSHeight=365;

    if($xSSWidth=="")
        $xSSWidth=995;
    ?>
<script type="text/javascript">
    var xSSWidth = <?php echo $xSSWidth;?>;
    var xSSHeight = <?php echo $xSSHeight;?>;
</script>

    <?php
    $myStyleUrl = plugins_url('scripts/script.js',__FILE__);
    wp_register_script('SliceShow_AdminScript', $myStyleUrl);
    wp_enqueue_script('SliceShow_AdminScript');
}

//Add stylesheet for admin page
function SliceShow_adminPrintStyles() {
    $myStyleUrl = plugins_url('style.css',__FILE__);
    wp_register_style('SliceShow_AdminStyle', $myStyleUrl);
    wp_enqueue_style('SliceShow_AdminStyle');
}
function SliceShow_plugin_options_page() {
    if($_POST['xHidd_SliceShow_options']=="true") {
        $xPostArr = unserialize(get_option('SliceShow_values'));
        $xPostArr[0] = $_POST['xSSCategory'];
        $xPostArr[1] = $_POST['xSSjQuery'];
        $xPostArr[2] = $_POST['xSSWidth'];
        $xPostArr[3] = $_POST['xSSHeight'];
        update_option('SliceShow_values', serialize($xPostArr));
    }
    $xDBArr = unserialize(get_option('SliceShow_values'));
    $xSSCategory = stripslashes($xDBArr[0]);
    $xSSjQuery = stripslashes($xDBArr[1]);
    $xSSWidth = stripslashes($xDBArr[2]);
    $xSSHeight = stripslashes($xDBArr[3]);
    ?>
<div class="wrap">
    <h2>SliceShow Options</h2>
</div>
<form action="" method="POST" id="form" >
    <h3>Plugin Options</h3>
    Select the category from where you want the gallery posts to show<br /><br/>
    <select name="xSSCategory">
            <?php
            $args = array(
                    'hide_empty'               => false,
                    'exclude' => 1
            );
            $categories=get_categories($args);
            foreach ($categories as $cat) {
                ?>
        <option value="<?php echo $cat->cat_ID;?>" <?php if($cat->cat_ID==$xSSCategory) { ?> selected <?php }?>><?php echo $cat->name;?></option>
                <?php
            }
            ?>
    </select><br/> <br/>

    <input type="checkbox" name="xSSjQuery" <?php if($xSSjQuery=="on") echo " checked "; ?> /> - <b>Add jQuery Call?</b><br/>
    (if you are already using jquery script link disable this) - NOTE: If you are experiencing javascript bugs, disable this
    <br/> <br/>
    <b>Slideshow Width &amp; Height</b> <br/>
    Width: <input type="text" name="xSSWidth" value="<?php echo $xSSWidth;?>" /> &amp;
    Height: <input type="text" name="xSSHeight" value="<?php echo $xSSHeight;?>" /><br />
    Default is 995(width) and 365(height)
    <br/> <br/>
    <input type="submit" value="Update" /><br/>

    <input type="hidden" name="xHidd_SliceShow_options" value="true" />
</form>
    <?php
}

function SliceShow_AdminMenu() {
    add_menu_page( __('SliceShow', 'SliceShow'), __('SliceShow', 'SliceShow'), 8, 'SliceShow', 'SliceShow_plugin_options_page');
    add_submenu_page( 'SliceShow', __('SliceShow', 'SliceShow'), __('Settings', 'SliceShow'), 8, 'SliceShow', 'SliceShow_plugin_options_page' );
}
function SliceShow_wp_head() {
    $xDBArr = unserialize(get_option('SliceShow_values'));
    $xSSWidth = stripslashes($xDBArr[2]);
    $xSSHeight = stripslashes($xDBArr[3]);
    if($xSSHeight=="")
        $xSSHeight=365;

    if($xSSWidth=="")
        $xSSWidth=995;
    ?>
<style type="text/css">
    .xSSSlideshow {
        width:<?php echo $xSSWidth;?>px;
        height:<?php echo $xSSHeight;?>px;
    }
    .xSSSlideshow .xA{
        width:<?php echo $xSSWidth*0.6;?>px;
        height:<?php echo $xSSHeight*0.55;?>px;
    }
    .xSSSlideshow .xB{
        width:<?php echo $xSSWidth*0.4;?>px;
        height:<?php echo $xSSHeight*0.55;?>px;
    }
    .xSSSlideshow .xC{
        height:<?php echo $xSSHeight*0.55;?>px;
    }
    .xSSSlideshow .xD,
    .xSSSlideshow .xE,
    .xSSSlideshow .xF{
        width:<?php echo $xSSWidth*0.33;?>px;
        height:<?php echo $xSSHeight*0.45;?>px;
        margin-top:<?php echo $xSSHeight*0.55+1;?>px;
    }
</style>

    <?php
}

//add_action('init', 'SliceShow_Init');
add_action('wp_head', 'SliceShow_wp_head');
add_action('admin_menu', 'SliceShow_AdminMenu');
add_action('wp_print_styles', 'SliceShow_adminPrintStyles');
add_action('wp_print_scripts', 'SliceShow_adminPrintScripts');
?>
